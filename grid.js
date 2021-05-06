function createGrid(rows, cols) {
    let grid = $('#grid');
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            grid.append(createCheckbox(r, c));
        }
    }
}

function createCheckbox(rowNum, colNum) {
    return $('<input>')
        .attr({
            type: 'checkbox',
            id: `${rowNum}-${colNum}`,
            disabled: false,
            class: 'checkbox'
        });
}

// TODO: Figure out a way to make switches smaller :/

// function createSwitch(rowNum, colNum) {
//     return $("<div></div>")
//             .attr({
//                 class: 'switch-container form-switch',
//                 width: '10px'
//             }).append(
//                 $('<input>')
//                     .attr({
//                         type: 'checkbox',
//                         id: `${rowNum}-${colNum}`,
//                         disabled: false,
//                         class: 'form-check-input switch',
//                         'data-size': "lg"
//                     })
//                     .addClass('checkbox')
//             );
// }