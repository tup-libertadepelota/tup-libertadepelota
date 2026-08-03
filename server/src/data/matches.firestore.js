import db from '../config/firebase.js';

const COLLECTION_NAME = 'matches';

function matchesCollection() {
  return db.collection(COLLECTION_NAME);
}

function getMatchDocId(match) {
  const matchId = match?.fixture?.id;

  if (matchId === undefined || matchId === null) {
    throw new Error('Match fixture id is required');
  }

  return matchId.toString();
}

function snapshotToMatch(doc) {
  return doc.exists ? doc.data() : null;
}

async function findMatchDocRef(id) {
  const docId = id.toString();
  const directDocRef = matchesCollection().doc(docId);
  const directSnapshot = await directDocRef.get();

  if (directSnapshot.exists) {
    return directDocRef;
  }

  const numericId = Number(id);

  const byStoredId = await matchesCollection().where('id', '==', numericId).limit(1).get();

  if (!byStoredId.empty) {
    return byStoredId.docs[0].ref;
  }

  const byFixtureId = await matchesCollection().where('fixture.id', '==', numericId).limit(1).get();

  if (!byFixtureId.empty) {
    return byFixtureId.docs[0].ref;
  }

  return null;
}

export async function getMatches() {
  const snapshot = await matchesCollection().get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function getMatchById(id) {
  const docRef = await findMatchDocRef(id);

  if (!docRef) {
    return null;
  }

  const snapshot = await docRef.get();
  return snapshotToMatch(snapshot);
}

export async function addMatch(match) {
  const docId = getMatchDocId(match);
  await matchesCollection().doc(docId).set(match);
  return match;
}

export async function replaceMatch(id, newMatch) {
  const docRef = await findMatchDocRef(id);

  if (!docRef) {
    return null;
  }

  await docRef.set(newMatch);
  return newMatch;
}

export async function updateMatchActive(id, active) {
  const docRef = await findMatchDocRef(id);

  if (!docRef) {
    return null;
  }

  await docRef.update({ active });
  const updatedSnapshot = await docRef.get();
  return snapshotToMatch(updatedSnapshot);
}

export async function deleteMatch(id) {
  const docRef = await findMatchDocRef(id);

  if (!docRef) {
    return false;
  }

  await docRef.delete();
  return true;
}

export async function initializeMatches(matches) {
  const snapshot = await matchesCollection().get();

  if (!snapshot.empty) {
    return;
  }

  const batch = db.batch();

  for (const match of matches) {
    const docId = getMatchDocId(match);
    batch.set(matchesCollection().doc(docId), match);
  }

  await batch.commit();
}
