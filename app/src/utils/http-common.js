import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;
let uri = 'http://localhost:5000';
if (manifest.debuggerHost !== undefined) {
  uri = `http://${manifest.debuggerHost.split(':').shift()}:5000`;
}
export default axios.create({
  baseURL: uri,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});