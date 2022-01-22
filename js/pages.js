// Модуль pages

function makeMainPage() {
    let header = document.querySelector('.header');

    let taskDescr = document.createElement('div');
    taskDescr.className = "task-description";
    header.after(taskDescr);
    let taskText = document.createElement('div');
    taskText.textContent = "Choose your pokémon";
    taskDescr.prepend(taskText);
    let errText = document.createElement('div');
    errText.className = "error";
    errText.textContent = "";
    taskDescr.append(errText);

    let chooseContent = document.createElement('div');
    chooseContent.className = "choose-content";
    taskDescr.after(chooseContent);

    // Fennekin
    let chooseItem = document.createElement('div');
    chooseItem.className = "choose-item";
    chooseItem.id = "p1";
    chooseContent.append(chooseItem);
    // Img внутри chooseItem
    let pokemonImg = document.createElement('img');
    pokemonImg.className = "pokemon-img";
    pokemonImg.src = "images/Fennekin.png";
    chooseItem.append(pokemonImg);
    // Имя покемона внутри chooseItem
    let pokemonName = document.createElement('p');
    pokemonName.className = "pokemon-name";
    pokemonName.textContent = "Fennekin";
    chooseItem.append(pokemonName);
    // Тип покемона внутри chooseItem
    let pokemonType = document.createElement('div');
    pokemonType.className = "pokemon-type";
    pokemonType.id = "type-fire";
    chooseItem.append(pokemonType);
    // Название типа покемона внутри pokemonType
    let typeName = document.createElement('span');
    typeName.className = "type-name";
    typeName.textContent = "FIRE";
    pokemonType.append(typeName);

    // Snivy
    chooseItem = document.createElement('div');
    chooseItem.className = "choose-item";
    chooseItem.id = "p2";
    chooseContent.append(chooseItem);
    // Img внутри chooseItem
    pokemonImg = document.createElement('img');
    pokemonImg.className = "pokemon-img";
    pokemonImg.src = "images/Snivy.png";
    chooseItem.append(pokemonImg);
    // Имя покемона внутри chooseItem
    pokemonName = document.createElement('p');
    pokemonName.className = "pokemon-name";
    pokemonName.textContent = "Snivy";
    chooseItem.append(pokemonName);
    // Тип покемона внутри chooseItem
    pokemonType = document.createElement('div');
    pokemonType.className = "pokemon-type";
    pokemonType.id = "type-grass";
    chooseItem.append(pokemonType);
    // Название типа покемона внутри pokemonType
    typeName = document.createElement('span');
    typeName.className = "type-name";
    typeName.textContent = "GRASS";
    pokemonType.append(typeName);

    // Piplup
    chooseItem = document.createElement('div');
    chooseItem.className = "choose-item";
    chooseItem.id = "p3";
    chooseContent.append(chooseItem);
    // Img внутри chooseItem
    pokemonImg = document.createElement('img');
    pokemonImg.className = "pokemon-img";
    pokemonImg.src = "images/Piplup.png";
    chooseItem.append(pokemonImg);
    // Имя покемона внутри chooseItem
    pokemonName = document.createElement('p');
    pokemonName.className = "pokemon-name";
    pokemonName.textContent = "Piplup";
    chooseItem.append(pokemonName);
    // Тип покемона внутри chooseItem
    pokemonType = document.createElement('div');
    pokemonType.className = "pokemon-type";
    pokemonType.id = "type-water";
    chooseItem.append(pokemonType);
    // Название типа покемона внутри pokemonType
    typeName = document.createElement('span');
    typeName.className = "type-name";
    typeName.textContent = "WATER";
    pokemonType.append(typeName);

    // Bergmite
    chooseItem = document.createElement('div');
    chooseItem.className = "choose-item";
    chooseItem.id = "p4";
    chooseContent.append(chooseItem);
    // Img внутри chooseItem
    pokemonImg = document.createElement('img');
    pokemonImg.className = "pokemon-img";
    pokemonImg.src = "images/Bergmite.png";
    chooseItem.append(pokemonImg);
    // Имя покемона внутри chooseItem
    pokemonName = document.createElement('p');
    pokemonName.className = "pokemon-name";
    pokemonName.textContent = "Bergmite";
    chooseItem.append(pokemonName);
    // Тип покемона внутри chooseItem
    pokemonType = document.createElement('div');
    pokemonType.className = "pokemon-type";
    pokemonType.id = "type-ice";
    chooseItem.append(pokemonType);
    // Название типа покемона внутри pokemonType
    typeName = document.createElement('span');
    typeName.className = "type-name";
    typeName.textContent = "ICE";
    pokemonType.append(typeName);

    let btnDiv = document.createElement('div');
    btnDiv.className = "btn";
    btnDiv.innerHTML = "<input type=\"button\" class=\"ready-btn\" value=\"I\'M READY\">";
    chooseContent.after(btnDiv);
}

function delMainPage() {
    let taskDescr = document.querySelector('.task-description');
    taskDescr.remove();
    let chooseContent = document.querySelector('.choose-content');
    chooseContent.remove();
    let btnDiv = document.querySelector('.btn');
    btnDiv.remove();
}

function makeBattlePage() {
    let header = document.querySelector('.header');

    let battleContent = document.createElement('div');
    battleContent.className = "battle-content";
    header.after(battleContent);

    // Player
    let blockcontent = document.createElement('div');
    blockcontent.className = "block-content";
    battleContent.append(blockcontent);
    let pokemonPlayer = document.createElement('div');
    pokemonPlayer.className = "pokemon-player";
    pokemonPlayer.id = "p1";
    blockcontent.append(pokemonPlayer);
    // Img внутри pokemonPlayer
    let pokemonImg = document.createElement('img');
    pokemonImg.className = "player-img";
    pokemonImg.src = "images/Fennekin.png";
    pokemonPlayer.append(pokemonImg);
    // Имя покемона внутри pokemonPlayer
    let pokemonName = document.createElement('p');
    pokemonName.className = "player-name";
    pokemonName.textContent = "Fennekin";
    pokemonPlayer.append(pokemonName);
    // Тип покемона внутри pokemonPlayer
    let pokemonType = document.createElement('div');
    pokemonType.className = "player-type";
    pokemonType.id = "player-type-fire";
    pokemonPlayer.append(pokemonType);
    // Название типа покемона внутри pokemonType
    let typeName = document.createElement('span');
    typeName.className = "player-type-name";
    typeName.textContent = "FIRE";
    pokemonType.append(typeName);
    // Hp
    let hpInfo = document.createElement('div');
    hpInfo.className = "hp-info";
    blockcontent.append(hpInfo);
    let hpName = document.createElement('span');
    hpName.className = "hp-name";
    hpName.textContent = "HP";
    hpInfo.append(hpName);
    // Hp-bar
    let playerHpInfo = document.createElement('div');
    playerHpInfo.className = "player-hp-info";
    hpInfo.append(playerHpInfo);
    let playerHpBar = document.createElement('div');
    playerHpBar.id = "player-hp-bar";
    playerHpInfo.append(playerHpBar);
    let playerHpAmount = document.createElement('span');
    playerHpAmount.id = "player-hp-amount";
    playerHpAmount.textContent = "100/100";
    playerHpInfo.append(playerHpAmount);
    // Attack-1
    let atk = document.createElement('div');
    atk.className = "attack";
    atk.id = "atk-1";
    blockcontent.append(atk);
    let atk1Img = document.createElement('img');
    atk1Img.id = "attack-1-img";
    atk1Img.src = "images/punch.png";
    atk.append(atk1Img);
    let atkText = document.createElement('div');
    atkText.id = "attack-1";
    atkText.textContent = "Scratch";
    atk.append(atkText);
    // Attack-2
    atk = document.createElement('div');
    atk.className = "attack";
    atk.id = "atk-2";
    blockcontent.append(atk);
    let atk2Img = document.createElement('img');
    atk2Img.id = "attack-2-img";
    atk2Img.src = "images/fire.png";
    atk.append(atk2Img);
    atkText = document.createElement('div');
    atkText.id = "attack-2";
    atkText.textContent = "Ember";
    atk.append(atkText);
    let timeoutImg = document.createElement('img');
    timeoutImg.className = "timeout";
    timeoutImg.src = "images/clock.png";
    atk.append(timeoutImg);

    // VS
    let vsTextDiv = document.createElement('div');
    vsTextDiv.className = "vs-text";
    battleContent.append(vsTextDiv);
    let vsText = document.createElement('span');
    vsText.textContent = "VS";
    vsTextDiv.append(vsText);
    
    // Enemy
    blockcontent = document.createElement('div');
    blockcontent.className = "block-content";
    battleContent.append(blockcontent);
    pokemonPlayer = document.createElement('div');
    pokemonPlayer.className = "pokemon-player";
    pokemonPlayer.id = "p2";
    blockcontent.append(pokemonPlayer);
    // Img внутри pokemonPlayer
    pokemonImg = document.createElement('img');
    pokemonImg.className = "player-img";
    pokemonImg.src = "images/Fennekin.png";
    pokemonPlayer.append(pokemonImg);
    // Имя покемона внутри pokemonPlayer
    pokemonName = document.createElement('p');
    pokemonName.className = "player-name";
    pokemonName.textContent = "Fennekin";
    pokemonPlayer.append(pokemonName);
    // Тип покемона внутри pokemonPlayer
    pokemonType = document.createElement('div');
    pokemonType.className = "player-type";
    pokemonType.id = "player-type-fire";
    pokemonPlayer.append(pokemonType);
    // Название типа покемона внутри pokemonType
    typeName = document.createElement('span');
    typeName.className = "player-type-name";
    typeName.textContent = "FIRE";
    pokemonType.append(typeName);
    // Hp
    hpInfo = document.createElement('div');
    hpInfo.className = "hp-info";
    blockcontent.append(hpInfo);
    hpName = document.createElement('span');
    hpName.className = "hp-name";
    hpName.textContent = "HP";
    hpInfo.append(hpName);
    // Hp-bar
    playerHpInfo = document.createElement('div');
    playerHpInfo.className = "player-hp-info";
    hpInfo.append(playerHpInfo);
    playerHpBar = document.createElement('div');
    playerHpBar.id = "enemy-hp-bar";
    playerHpInfo.append(playerHpBar);
    playerHpAmount = document.createElement('span');
    playerHpAmount.id = "enemy-hp-amount";
    playerHpAmount.textContent = "100/100";
    playerHpInfo.append(playerHpAmount);
    // Attack-3
    atk = document.createElement('div');
    atk.className = "attack";
    atk.id = "atk-3";
    blockcontent.append(atk);
    let atk3Img = document.createElement('img');
    atk3Img.id = "attack-3-img";
    atk3Img.src = "images/punch.png";
    atk.append(atk3Img);
    atkText = document.createElement('div');
    atkText.id = "attack-3";
    atkText.textContent = "Scratch";
    atk.append(atkText);
    // Attack-4
    atk = document.createElement('div');
    atk.className = "attack";
    atk.id = "atk-4";
    blockcontent.append(atk);
    let atk4Img = document.createElement('img');
    atk4Img.id = "attack-4-img";
    atk4Img.src = "images/fire.png";
    atk.append(atk4Img);
    atkText = document.createElement('div');
    atkText.id = "attack-4";
    atkText.textContent = "Ember";
    atk.append(atkText);
    timeoutImg = document.createElement('img');
    timeoutImg.className = "timeout";
    timeoutImg.src = "images/clock.png";
    atk.append(timeoutImg);
}

function delBattlePage() {
    let battleContent = document.querySelector('.battle-content');
    battleContent.remove();
}

function makeEndPage() {
    let header = document.querySelector('.header');

    let taskDescr = document.createElement('div');
    taskDescr.className = "end-description";
    header.after(taskDescr);
    /*
    let taskText = document.createElement('p');
    taskText.textContent = "Choose your pokémon";
    taskDescr.prepend(taskText);*/

    let btnDiv = document.createElement('div');
    btnDiv.className = "btn";
    btnDiv.innerHTML = "<input type=\"button\" class=\"again-btn\" value=\"TRY AGAIN\">";
    taskDescr.after(btnDiv);
}