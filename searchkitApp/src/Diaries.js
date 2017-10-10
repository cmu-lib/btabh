import React, { Component } from 'react'
import { extend } from 'lodash'
import App from './App'
import { SearchkitManager,SearchkitProvider,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  RefinementListFilter, FilteredQuery, MatchQuery, TermQuery,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters,
    BoolMust,BoolShould,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'
import './index.css'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'



const host = "http://localhost:9200/tolstoy"
const searchkit = new SearchkitManager(host)
var pathArray = window.location.pathname.split( '/' );
var secondLevelLocation = pathArray[2];

searchkit.addDefaultQuery((query)=> {
    return query.addQuery(FilteredQuery({
      filter:BoolShould([
        TermQuery("_id", secondLevelLocation)
      ])
    }))
  })


const tolListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = (result._type + "/" + result._id)
  const source = extend({}, result._source)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("id")} dangerouslySetInnerHTML={{__html:source.id}}></h2></a>
        <h3 className={bemBlocks.item("place")}>written in {source.place}</h3>
        <h4>date:</h4>
        <h3 className={bemBlocks.item("source")} dangerouslySetInnerHTML={{__html: new Date (source.date).toDateString()}}></h3>
        <h3 className={bemBlocks.item("source")} dangerouslySetInnerHTML={{__html:source.source}}></h3>
        <h4>entry:</h4>
        <div className={bemBlocks.item("entry")} dangerouslySetInnerHTML={{__html:source.entry}}></div>
      </div>
    </div>
  )
}

class diaries extends Component {


  render(){

  return (


  <SearchkitProvider searchkit={searchkit}>
    <div>
    <header>
    </header>

    <main>
    <ViewSwitcherHits
        hitsPerPage={1} highlightFields={["_id","entry"]}
        sourceFilter={["source", "place", "date", "_id", "entry"]}
        hitComponents={[
          {key:"list", title:"List", itemComponent:tolListItem, defaultOption:true}
        ]}
        scrollTo="body"
    />






    </main>

    <footer>
    </footer>
      </div>
    </SearchkitProvider>
    );
  }
}

export default diaries;
