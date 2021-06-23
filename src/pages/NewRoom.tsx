import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [roomName, setRoomName] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (roomName.trim() === '') {
      return;
    }

    const roomsRef = database.ref('rooms');

    const newRoom = await roomsRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${newRoom.key}`);
  }

  return (
    <div id="page-auth">

      <aside>
        <img src={illustrationImg} alt="Perguntas e Respostas" />
        <strong>Crie salas de Q&amp;A ao vivo!</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button type="submit">
              Criar sala
            </Button>
            <p>
              Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
            </p>
          </form>

        </div>
      </main>
    </div>

  );
}