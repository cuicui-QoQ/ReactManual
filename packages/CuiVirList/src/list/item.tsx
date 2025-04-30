import React from 'react';

const ListItem = (props) => {
    return (
        <div style={{ width: '200px', display: 'block', height: '100px', backgroundColor: props.actualIndex % 2 ? '#bfa': '#bcc' }} >{props.actualIndex}</div>
    )
}

export default ListItem
