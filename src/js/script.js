/**  Auxiliary class that performs the searches. */
class Search {

    /**
     * Searches the .json file using Fetch API and calls the appropriate method to handle the search result.
     * @param {string} searchString - The order number to search for.
     */
    static doSearch(searchString) {
        var result = fetch('../dados.json').then((response) => {
        
            return response.json();
        
        }).then((response) => {
        
            var orders = response.encomendas;
            var found = false;
            var foundOrder;
            
            for (var order of orders) {
                if (order.numero === searchString){
                    found = true;
                    foundOrder = order;
                }
            }

            if(found){
                Search.showSuccess(foundOrder);
            } else {
                Search.showError();
            }
    
        }).catch((error)=>{
    
            console.error('Something went wrong with the JSON file!');
            console.log(error);
        
        });
    }

    /**
     * Shows the error message.
     */
    static showError() {
        var divError = document.getElementById('error');
        divError.style.display = "none";
        setTimeout(() => {
            divError.style.display = "block";

            var divSuccess = document.getElementById('success');
            divSuccess.style.display = "none";
        }, 10);
        return divError;
    }

    /**
     * Shows order data.
     * @param {encomenda} order - The order obj from the JSON file to show.
     */
    static showSuccess(order) {
        var divError = document.getElementById('error');
        divError.style.display = "none";

        var divSuccess = document.getElementById('success');
        divSuccess.style.display = "block";

        var clientName = document.getElementById('clientName');
        clientName.innerHTML = `${order.cliente.id} - ${order.cliente.nome}`;

        var value = document.getElementById('value');
        value.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valor);

        var data = document.getElementsByClassName('data');
        [].slice.call(data).forEach(function (div) {
            div.innerHTML = new Date(order.data).toLocaleDateString();
        });

        var status = document.getElementById('status');
        if (order.entregue) {
            status.innerHTML = 'Entregue';
        }
        else {
            status.innerHTML = 'Entregar';
        }
        return divError;
    }
}


/**
 * Input listener for the 'Enter' key press event.
 */
const inputEle = document.getElementById('search');
inputEle.addEventListener('keyup', (e)=>{
  var key = e.which || e.keyCode;
  if (key == 13) { 

    const searchString = document.getElementById('search').value.toUpperCase();
    Search.doSearch(searchString);

  }
});

/**
 * Input listener for the search button click event.
 */
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', (e)=>{

    const searchString = document.getElementById('search').value.toUpperCase();
    Search.doSearch(searchString);

})

