class OMDBClient {
    constructor(url, api_key) {
        this.url = url;
        this.api_key = api_key;
        this.state = {};
    }

    render(data) {
        console.log(data);
        document.querySelector(".main").innerHTML = data
                .map(movie=> this.render_data_to_dom(movie))
                .join("")
        
        
    }

    render_data_to_dom = (element) => {
    	return `<div class="col-md-6 py-4">
                        <h2>Title:  <small> ${element.Title}</small></h2>
                        <h2>Year: <small>${element.Year}</small></h2>
                        <h2>imdbID: <small id = "imdbID">${element.imdbID}</small></h2>
                        <h2 class = "plot" data-id="${element.imdbID}">Read Plot</h2>
                    </div>
                    <div class="col-md-6 py-4" id="hi">
                        <img src=${element.Poster} alt="Responsive image"/><br>
                    </div>`;
    }

    add_plot (element) {
        document.querySelectorAll('.plot').forEach(section => {
            section.addEventListener('click', (e) => {
              let id = e.target.dataset.id;
              get_plot_by_id(id);
              //e.target.innerHTML = plot;  
              alert(get_plot_by_id(id)) 
            })
          });
    }
    
    /*create_tag(tag, attrs) {
        let t = document.createElement(tag);
        for(k in attrs) {
          t.setAttribute(k, attrs[k]);
        }
        return t;
      }
      
    add_plot(element) {
        
        let plot_container = this.create_tag("h2", {'class': "plot", 'id': element.imdbID});
        let plot_initial_text = document.createTextNode("Read Plot");
        
        plot_container.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
            
            let result = client.get_by_id(id);
            
            plot_container.appendChild(result.Plot);
        
        })	
        
        plot_container.appendChild(plot_initial_text);
        return plot_container;
        }*/

    search(keyword) {
        let url = `${this.url}/?apikey=${this.api_key}&s=${keyword}`;
        
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.search_results = data.Search;
                    this.render(this.state.search_results);
                

                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    }

    get_by_id(id) {
        let url = `${this.url}/?apikey=${this.api_key}&i=${id}`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response === 'True') {
                    this.state.movie = data
                } else {
                    alert("Failed to load data"); 
                }
            }).catch(err => console.log(err.message));
    }        
}

