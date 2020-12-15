import {render, screen} from '@testing-library/react';
import Start from './Start';
import React from "react";
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

test('Start UI Test', () => {
    let container = document.createElement('div');
    document.body.appendChild(container);


    act(() => {
        ReactDOM.render(<Start />, container);
    });

    //Usernameinput
    const input = container.querySelector('input');
    expect(input.placeholder).toBe('Benutzername');

    //Button
    const button = container.querySelector('button');
    expect(button.innerHTML).toBe('Absenden');

    //Icon
    const icon = container.getElementsByClassName('IconContainer')[0].firstChild.firstChild;
    expect(icon.src).toBe('http://localhost/logo.png');

    //Semester
    //const semesterHeading = semesters.getElementsByClassName("Semester")[0].firstChild;
    //expect(semesterHeading.innerHTML).toBe('HSD Semester 1');


});
