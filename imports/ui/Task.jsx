import React from 'react';
import classnames from 'classnames'
//Defines tasks
export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    const classes = classnames('task', {
        'checked': Boolean(task.isChecked)
    });

    return (
        <li className={classes}>
            <button onClick={() => onDeleteClick(task)}>&times;</button>
            <span>{task.text}</span>
            <input
                type="checkbox"
                checked={Boolean(task.isChecked)}
                onClick={() => onCheckboxClick(task)}
                readOnly
            />

        </li>
    );
};