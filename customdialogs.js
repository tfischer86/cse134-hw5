export function createDialog(contents, inputs = `<button type="submit">OK</button>`) {
    let template = `
    <form method="dialog">
    ${contents}
    ${inputs}
    </form>`;

    let dialog = document.createElement('dialog');
    dialog.innerHTML = template;
    return dialog;
}

export function createAlert(message) {
    let contents = `<p>${message}</p>`;
    let dialog = createDialog(contents);
    dialog.className = 'alert-dialog';
    return dialog;
}

export function createConfirm(message) {
    let contents = `<p>${message}</p>`;
    let inputs = `<button type="submit">Cancel</button>
    <button type="submit" value="true">OK</button>`;

    let dialog = createDialog(contents, inputs);
    dialog.className = 'confirm-dialog';
    return dialog;
}

export function createPrompt(message) {
    let contents = `<label for="prompt-dialog-input" id="prompt-dialog-message">${message}</label><br>`;
    let inputs = `
    <input id="prompt-dialog-input" name="prompt-dialog-input"><br>
    <button type="submit">Cancel</button>
    <button type="submit">OK</button>`;
    let dialog = createDialog(contents, inputs);
    dialog.className = 'prompt-dialog';
    return dialog;
}

/*
<dialog id="alert-dialog">
    <form method="dialog">
        <p id="alert-dialog-message"></p>
        <button type="submit">OK</button>
    </form>
</dialog>

<dialog id="confirm-dialog">
    <form method="dialog">
        <p id="confirm-dialog-message"></p>
        <button type="submit">Cancel</button>
        <button type="submit" value="true">OK</button>
    </form>
</dialog>

<dialog id="prompt-dialog">
    <form method="dialog">
        <label for="prompt-dialog-input" id="prompt-dialog-message"></label>
        <input id="prompt-dialog-input" name="prompt-dialog-input">
        <button type="submit">OK</button>
    </form>
</dialog>
*/