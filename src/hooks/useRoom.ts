import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

export type BaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>;

export type QuestionType = {
  id: string,
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likesCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const roomVal = room.val();
      const data: BaseQuestions = roomVal.questions ?? {};
      const entries = Object.entries(data).map(([key, value]) => {
        return {
          id              : key,
          content         : value.content,
          author          : value.author,
          isHighlighted   : value.isHighlighted,
          isAnswered      : value.isAnswered,
          likesCount      : Object.values(value.likes ?? {}).length,
          likeId          : Object.entries(value.likes ?? {})
                              .find(([key, like]) => like.authorId === user?.id)?.[0],
        };
      });

      setTitle(roomVal.title);
      setQuestions(entries);

    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, user?.id]);

  return { questions, title };
};
