const baseUrl = "http://api.tvmaze.com/";
const allShowsEndpoint = baseUrl + 'shows';
const searchEndPoint = baseUrl + "search/shows?q=";

$(function (){
    const $showList = $('#showList');
    const $show_container = $('#show');
    const $homeLink = $('#homeLink')
    
    //get all shows
    $.ajax({
        type: 'GET',
        url: allShowsEndpoint,
        success: function(event){
            //console.log('success', event)
            $.each(event, function(i, shows){
                const li = (`<li class = 'showLink' id = '${shows.id}'> <a href = "${shows._links.self.href}">${shows.name}</a>  </li>`);
                $showList.append(li);
            });
            $showList.show();
            $show_container.hide();
            $homeLink.hide();
        }
    });
    
    const $searchForm = $('#searchForm');
    const $search_term = $('#search_term');
    
    //use search field to search shows
    $searchForm.submit(async function(event){
        event.preventDefault();
        
        let endPoint = searchEndPoint + `${$search_term.val().toString()}`;
        
        if(!$search_term.val() || !$search_term.val().replace(/\s/g, "").length)
        {
            alert("Value for Search Term is required.");
            
        }else{
            $showList.empty();
            $.ajax({
                url: endPoint,
                success: function(searchTerm){
                    //console.log('success', searchTerm)
                    if(searchTerm.length === 0){
                        alert("no show found")
                    }
                    else{
                        $.each(searchTerm, function(i, shows){
                            const li = (`<li class = "showLink" id = '${shows.show.id}'> <a id = '${shows.show.id}' href = "${shows.show._links.self.href}">${shows.show.name}</a></li>`)
                            $showList.append(li);
                        });
                    }
                    $showList.show();
                    $show_container.hide();
                    $search_term.focus();
                    $homeLink.show();
                    $searchForm.reset();
                }
            });
        }   
    });

    //get the show by Id
    $(document).on('click', '.showLink', function(event){
        event.preventDefault();
        
        let showId = $(this).attr('id');
        let endpoint = allShowsEndpoint + `/${showId}`;

        $showList.hide();
        $show_container.empty();

        $.ajax({
            url: endpoint,
            success: function(thatShow){
                //console.log('success', thatShow)
                let h1 = '';
                if(thatShow.name !== "") {
                    h1 = `<h1>${thatShow.name}</h1>`
                }
                else{
                    h1 = `<h1>N/A</h1>`;
                }
                $show_container.append(h1);
                
                let img = '';
                if(thatShow.image && thatShow.image.medium !== ""){
                    img = `<img src=${thatShow.image.medium} alt=${thatShow.name}/>`;
                }else{
                    img = `<img src = "image/no_image.jpeg" alt="no_image"/>`;
                }
                $show_container.append(img);
                
                //display language
                let dl = '';
                if(thatShow.language && thatShow.language !== ""){
                    dl = `<dl> <dt>Language</dt><br> <dd>${thatShow.language}</dd> <br>`
                }else{
                    dl = `<dl> <dt>Language</dt><br> <dd>N/A</dd> <br>`;
                }
                
                dl = dl + "<dt>Genres</dt> <dd> <ul>";
                
                //display genre
                if(thatShow.genres.length > 0){
                    let genreArr = thatShow.genres;
                    genreArr.forEach(genre => {
                        dl = dl + `<li> ${genre} </li>`;
                    });
                }
                else{
                    dl = dl + '<li>N/A</li>';
                }
                
                dl = dl + "</ul></dd><br>";
                
                //display rating
                if(thatShow.rating.average === null)
                    dl = dl + `<dt>Rating</dt><br> <dd>N/A</dd><br>`;
                else
                    dl = dl + `<dt>Rating</dt><br> <dd>${thatShow.rating.average}</dd><br>`;
                
                //display network name
                if(thatShow.network && thatShow.network.name !== "")
                    dl = dl + `<dt>Network</dt><br> <dd>${thatShow.network.name}</dd><br>`;
                else
                    dl = dl + `<dt>Network</dt><br> <dd>N/A</dd><br>`;
                
                //display summary
                if(thatShow.summary && thatShow.summary !== "")
                    dl = dl + `<dt>Summary</dt> <dd>${thatShow.summary}</dd> </dl>`;
                else
                    dl = dl + `<dt>Summary</dt> <dd>N/A</dd> </dl>`;

                $show_container.append(dl);
                $show_container.show();
                $homeLink.show();
            }
        });
    });
});


