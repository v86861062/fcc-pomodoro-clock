import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('getMinuteSecond', () => {
  const app = new App()
  
  expect(app.getMinuteSecond(1500)).toEqual({minute: '25', second: '00'})
  expect(app.getMinuteSecond(1000)).toEqual({minute: '16', second: '40'})
  expect(app.getMinuteSecond(1)).toEqual({minute: '00', second: '01'})
  expect(app.getMinuteSecond(0)).toEqual({minute: '00', second: '00'})
})
