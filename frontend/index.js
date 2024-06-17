

const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second > 0) return `${second}초 전`;
    else "방금 전";
}

const renderData = (data) => {
    const main = document.querySelector("main");
    data.reverse().forEach(async (obj) => {
        const itemListDiv = document.createElement("div");
        itemListDiv.className = "item-list";

        const itemListImgDiv = document.createElement("div");
        itemListImgDiv.className = "item-list__img";

        const itemListImg = document.createElement("img");
        const res = await fetch(`/images/${obj.id}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        itemListImg.src = url;

        const itemListInfoDiv = document.createElement("div");
        itemListInfoDiv.className = "item-list__info";

        const itemListInfoTitle = document.createElement("div");
        itemListInfoTitle.className = "item-list__info-title";
        itemListInfoTitle.innerText = obj.title;

        const itemListInfoMeta = document.createElement("div");
        itemListInfoMeta.className = "item-list__info-meta";
        itemListInfoMeta.innerText = obj.place + '' + calcTime(obj.insertAt);

        const itemListInfoPrice = document.createElement("div");
        itemListInfoPrice.className = "item-list__info-price";
        itemListInfoPrice.innerText = obj.price;

        itemListDiv.appendChild(itemListImgDiv);
        itemListImgDiv.appendChild(itemListImg);
        itemListInfoDiv.appendChild(itemListInfoTitle);
        itemListInfoDiv.appendChild(itemListInfoMeta);
        itemListInfoDiv.appendChild(itemListInfoPrice);
        itemListDiv.appendChild(itemListInfoDiv);
        

        main.appendChild(itemListDiv);
    });
};

const fetchList = async () => {
    const res = await fetch('/items');
    const data = await res.json();
    renderData(data);
};

fetchList();