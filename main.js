document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    updateDate();
    fetch(
        'http://localhost:8000/proxy/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'text/xml',
          },
        }
      )
      .then(response => {
        return response.text(); // Convert XML response to text
    })
    .then(xmlText => {
        // Convert XML text to plain text
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll('item');
        counter = 1;
        list = document.createElement("ol");
        document.querySelector('#content').appendChild(list);
        items.forEach(item => {
            const name = item.querySelector('title').textContent;
            const description = item.querySelector('description').textContent;
            const listItem = document.createElement("li");
            listItem.textContent = `${name}`;
            list.appendChild(listItem);
            console.log(`${counter}.`, name);
            console.log("Description:", description);
            counter++;
        });
    })  
    .catch(console.error);
});    

function updateClock(){
    document.querySelector('#ctime').innerHTML = new Date().toLocaleTimeString();
    setTimeout(updateClock, 1000);
}
function updateDate(){
    timestamp = Number(new Date());
    document.querySelector('#cdate').innerHTML = new Date(timestamp).toDateString();
    setTimeout(updateDate, 86400000 - (new Date()).getMilliseconds());
}
