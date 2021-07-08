import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';

import '../styles/question.scss';

export type QuestionProps = {
  key               : React.Key;
  content           : string;
  author: {
    name            : string;
    avatar          : string;
  };
  children?         : ReactNode;
  isAnswered?       : boolean;
  isHighlighted?    : boolean;
  domRef            : React.RefObject<HTMLDivElement>
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
  domRef,
}: QuestionProps) {
  const previous = useRef(domRef.current);
  const [previousBox, setPreviousBox] = useState<DOMRect>();

  useLayoutEffect(() => {
    setPreviousBox(previous.current?.getBoundingClientRect());
    previous.current = domRef.current;
  }, [domRef]);

  useLayoutEffect(() => {
    const domNode = domRef.current;
    const currentBox = domNode?.getBoundingClientRect();
    if (domNode && previousBox && currentBox) {
      const changeInY = previousBox.y - currentBox.y;
      if (changeInY !== 0) {
        requestAnimationFrame(() => {
          // Before the DOM paints, invert child to old position
          domNode.style.transform = `translateY(${changeInY}px)`;
          domNode.style.transition = "transform 0s";

          requestAnimationFrame(() => {
            // After the previous frame, remove
            // the transition to play the animation
            domNode.style.transform = "";
            domNode.style.transition = "transform 500ms";
          });
        });
      }
    }
  }, [domRef, previousBox]);


  return (
    <div ref={domRef} className={cx({
      question    : true,
      answered    : isAnswered,
      highlighted : isHighlighted,
    })}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
};