import * as React from "react";
import * as _ from "lodash";

import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar, ItemList,
	SideBar, ActionBar, ActionBarRow, RangeFilter, DynamicRangeFilter,
	CheckboxFilter, RangeQuery, TermQuery, ItemCheckboxList, Panel,
	Select, Toggle, PageSizeSelector, HierarchicalMenuFilter
} from "searchkit";

require("./index.scss");

const host = "http://localhost:9200/tolstoy/"
const searchkit = new SearchkitManager(host)

const tolGridItem = (props)=> {
  const {bemBlocks, result} = props
  	let url = "http//:www.tolstoy.ru/" + result._source.id
  	const source:any = _.extend({}, result._source, result.highlight)
  	return (
			<div style={{width: "100%", boxSizing: "border-box", padding: 8}}>
			<table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
			<thead className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
			<a href={url} target="_blank">
					<th data-qa="source" className={bemBlocks.item("source")} dangerouslySetInnerHTML={{__html:source.source}}></th>
			</a>
			</thead>
		<tbody>
					<td data-qa="place" className={bemBlocks.item("place")} dangerouslySetInnerHTML={{__html:source.place}}></td>
					<td data-qa="date" className={bemBlocks.item("date")} dangerouslySetInnerHTML={{__html:new Date(source.date)}}></td>
					<td data-qa="to" className={bemBlocks.item("to")} dangerouslySetInnerHTML={{__html:source.to}}></td>
		</tbody>
				</table>
    </div>
  )
}

export class SearchPage extends React.Component {
	render(){
		return (
			<SearchkitProvider searchkit={searchkit}>
		    <Layout>
		      <TopBar>
		        <SearchBox
		          autofocus={true}
		          searchOnChange={true}
							placeholder="Search letters / diaries..."
		          prefixQueryFields={["source^1","content^2","notes^10"]}/>
		      </TopBar>
		      <LayoutBody>
		        <SideBar>
							<RangeFilter field="date"
								id="date"
								min={-4000000000000}
								max={-1736980907407}
								showHistogram={true}
								title="date"/>
							<MenuFilter
								containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
								id="place"
								title="place"
								field="place.raw"
								listComponent={ItemCheckboxList}
								size={5}/>
								<MenuFilter
									containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
									id="to"
									title="to"
									field="to.lastName"
									listComponent={ItemCheckboxList}
									size={5}/>
								<HierarchicalMenuFilter
								containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
								fields={["to.lastName", "to.firstName", "to.paternalName"]}
								title="name" id="to"/>
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Latest Releases", field:"date", order:"desc"},
										{label:"Earliest Releases", field:"date", order:"asc"}
									]}/>
		            </ActionBarRow>
								<ActionBarRow>
									<PageSizeSelector options={[5,10,20]} listComponent={Toggle}/>
									</ActionBarRow>
								<ActionBarRow>
		              <SelectedFilters/>
		              <ResetFilters/>
		            </ActionBarRow>
		          </ActionBar>
		          <Hits hitsPerPage={10} itemComponent={tolGridItem}
		            sourceFilter={["source", "place", "date", "to.originalEntry"]}/>
		        <NoHits/>
						<Pagination showNumbers={true}/>
		        </LayoutResults>
		      </LayoutBody>
		    </Layout>
		  </SearchkitProvider>
		)
	}
}
