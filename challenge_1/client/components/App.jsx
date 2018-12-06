import React from 'react';
import ReactPaginate from 'react-paginate';
import SearchResults from './SearchResults.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            input: '',
            data: [],
            onePageResults : [],
            offset: 0,
            pageCount: 0,
            showResults: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.searchResults = this.searchResults.bind(this);
    }

    handleChange(e){
        this.setState({
            input : e.target.value
        })
    }

    searchResults(){
        const query = this.state.input;
        fetch(`/events?q=${query}`, {
            data: {limit: this.props.perPage, offset: this.state.offset}
        })
            .then(res => res.json())
            .then(data => {
                const resultsPerPage = [];
                for(let i = this.state.offset; i <= this.state.offset+9; i++){
                    if(!data[i]) {
                        console.log('hi');
                        break;
                    }
                    resultsPerPage.push(data[i]);
                }
                this.setState({
                    data: data,
                    pageCount: Math.ceil(data.length / 10),
                    showResults: true,
                    onePageResults: resultsPerPage
                });
                }
            )
            .catch(err => console.log(err))
    }

    handleSubmit(e){
        e.preventDefault();
        this.searchResults();
    }

    handlePageClick(data){
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);
        this.setState({offset: offset}, () => {
            this.searchResults();
        });
    };

    render() {
        return (
            <div className="parent">
                <div className="text-center center">
                    <h1 className="display-1 logo">Googol</h1>
                </div>
                <form className="form-inline">
                    <div  className="center">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} />
                        <button className="btn btn-outline-success" type="submit" onClick={this.handleSubmit}>Search</button>
                    </div>
                </form>
                {
                    !this.state.showResults ? null :
                        <div>
                            <SearchResults results = {this.state.onePageResults}/>
                            <ReactPaginate previousLabel={"previous"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={this.state.pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={"pagination pg-1"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} />
                    </div>
                }

            </div>
        )
    }
}

export default App;