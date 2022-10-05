import RApi from '../client/LotrAPI';

const API = new RApi({ authKey: 'wBbMezei4bQZ37am7Ldu' });
async function test() {
  const data = await API.getCharacter();

  console.log(data);
}
test();
