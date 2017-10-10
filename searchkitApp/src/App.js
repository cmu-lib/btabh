import React, { Component } from 'react'
import { extend } from 'lodash'
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter, MenuFilter, Panel, ItemList,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, CheckboxFilter, BoolMust,
  RangeQuery, TermQuery, Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from 'searchkit'
import './index.css'
import { DateRangeFilter } from "searchkit-daterangefilter"


const host = "http://localhost:9200/tolstoy"
const searchkit = new SearchkitManager(host)


// tolGridItem gives an error and is not called at this time. Need to debug
const tolGridItem = (props)=> {
  const {bemBlocks, result} = props
  let url = result._id
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a href={url} target="_blank">
        <div data-qa="source" className={bemBlocks.item("source")} dangerouslySetInnerHTML={{__html:source.source}}>
        <div data-qa="id" className={bemBlocks.item("id")} dangerouslySetInnerHTML={{__html:source.id}}>
        <div data-qa="place" className={bemBlocks.item("place")} dangerouslySetInnerHTML={{__html:source.place}}>
        </div>
        </div>
        </div>
      </a>
    </div>
  )
}

const tolListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = (result._type + "/" + result._id)
  const source:any = extend({}, result._source, result.highlight)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h3 className={bemBlocks.item("type")}>{result._type} written on</h3><h3 className={bemBlocks.item("date")} dangerouslySetInnerHTML={{__html: new Date (source.date).toDateString()}}></h3></a>
        <h3 className={bemBlocks.item("place")}>Location: {source.place},To: {source.toWhom}</h3>
        <div className={bemBlocks.item("source")} dangerouslySetInnerHTML={{__html:source.source}}></div>
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <TopBar>
            <div className="my-logo">Tolstoy Search</div>
            <SearchBox autofocus={true} searchOnChange={true} prefixQueryFields={["source^1","content^2","notes^10","id^10"]}/>
          </TopBar>

        <LayoutBody>

          <SideBar>
          <RangeFilter min={-4000000000000} max={-1736980907407} field="date" id="date" title="Date" showHistogram={true}/>
          <RefinementListFilter id="type" title="Type" field="_type" operator="OR"/>
            <HierarchicalMenuFilter
                  fields={["to.lastName", "to.firstName", "to.paternalName"]}
                  title="name" id="to"/>
          <MenuFilter containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
  								id="place"
  								title="place"
  								field="place.raw"
  								listComponent={ItemList}
  								size={5}/>

          </SideBar>
          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats translations={{
                  "hitstats.results_found":"{hitCount} results found"
                }}/>
                <ViewSwitcherToggle/>
                <SortingSelector options={[
                  {label:"Relevance", field:"_score", order:"desc"},
                  {label:"Latest Releases", field:"date", order:"desc"},
                  {label:"Earliest Releases", field:"date", order:"asc"}
                ]}/>

              </ActionBarRow>

              <ActionBarRow>
                <GroupedSelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <ViewSwitcherHits
                hitsPerPage={10} highlightFields={["source","toWhom"]}
                sourceFilter={["source", "place", "date", "_id", "toWhom", "_type"]}
                hitComponents={[
                  {key:"list", title:"List", itemComponent:tolListItem, defaultOption:true}
                ]}
                scrollTo="body"
            />

            <NoHits suggestionsField={"title"}/>
            <Pagination showNumbers={true}/>
          </LayoutResults>

          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    );
  }
}

export default App;
