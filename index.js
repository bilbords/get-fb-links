// ==UserScript==
// @name        Get facebook ID's
// @match       *://www.facebook.com/*
// @grant        GM_addStyle
// ==/UserScript==

var zNode = document.createElement('div');
zNode.innerHTML = '<button id="btn" class="LinkButton">Get links</button>';
zNode.setAttribute('id', 'myContainer');
document.body.appendChild(zNode);

const btn = document.getElementById('btn');

btn.addEventListener('click', ButtonClickAction);

let text = '';

async function ButtonClickAction() {
  const fbAccounts = document.getElementsByClassName('uiContextualLayerParent');
  for (let i = 0; i < fbAccounts.length; i++) {
    if (fbAccounts[i].hasAttribute('data-userid')) {
      text +=
        'https://www.facebook.com/profile.php?id=' +
        fbAccounts[i].getAttribute('data-userid') +
        '\n';
    }
  }
  await navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Data succesfully wrote in the clipboard!');
    })
    .catch((err) => {
      console.log('Something went wrong: ', err);
    });
}

GM_addStyle(`

  #myContainer {
    position: absolute;
    top: 5px;
    right: 30px;
    padding: 25px 20px;
  }

  .LinkButton {
    background-color: white;
    border: none;
    color: black;
    padding: 16px 32px;
    border: 2px solid #008cba;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition: 0.4s;
    cursor: pointer;
  }

  .LinkButton:hover {
    background-color: #008cba;
    color: white;
  }

`);
