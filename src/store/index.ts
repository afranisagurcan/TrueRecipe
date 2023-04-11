import { createStore } from 'redux';

const reducer = (state: any, action: any) => {
  return state;
};

export const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}
export default createStore(reducer);
