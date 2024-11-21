import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general',
        apiKey: '45e368c7787540b3b65c828f98760141'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    }
    
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalPages: 1
        }
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        const filteredArticles = this.filterArticles(parsedData.articles);
        this.setState({
            articles : filteredArticles,
            totalResults : parsedData.totalResults,
            totalPages : Math.ceil(parsedData.totalResults / this.props.pageSize),
            loading : false
        })
    }

    async componentDidMount(){ 
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({page : this.state.page - 1})
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({page : this.state.page + 1})
        this.updateNews();
    }

    // Filter articles to remove ones with "Removed" content
    filterArticles = (articles) => {
        return articles.filter(article => article.content !== "[Removed]");
    }

    render() {
        return (
        <div className="container my-3">
            <h2 className="text-center">NewsApp - Top Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0, 36):""} description={element.description?element.description.slice(0, 88):""} 
                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                source={element.source.name}/>
            </div>
            })}
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page >= this.state.totalPages} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
        )
    }
}

export default News
