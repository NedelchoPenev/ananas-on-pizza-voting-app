import type { NextPage } from 'next';
import firebase from '../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const Home: NextPage = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [votes, votesLoading, votesError] = useCollection(
    db.collection('votes'),
    {}
  );

  const addVoteDocument = async (vote: string) => {
    await db
      .collection('votes')
      .doc(user?.uid)
      .set({ vote, voterName: user?.displayName });
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gridGap: 8,
        background:
          'linear-gradient(180deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      }}
    >
      <h1>Pineapple on Pizza?</h1>

      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument('yes')}
        >
          ✔️🍍🍕
        </button>
        <h3>
          Pineapple Lovers:{' '}
          {votes?.docs?.filter((doc) => doc.data().vote === 'yes').length}
        </h3>
      </div>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <button
          style={{ fontSize: 32, marginRight: 8 }}
          onClick={() => addVoteDocument('no')}
        >
          ❌🍍🍕
        </button>
        <h3>
          Pineapple Haters:{' '}
          {votes?.docs?.filter((doc) => doc.data().vote === 'no').length}
        </h3>
      </div>
    </div>
  );
};

export default Home;
