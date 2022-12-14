import React from 'react'
import DataGrid, {
	Button,
	Column,
	Editing,
	FilterRow,
	Pager,
	Paging,
	Scrolling
} from 'devextreme-react/data-grid'
import { dto } from 'uritmix.api'
import abonnementsStore from './store/soldAbonnementsStore'
import { nameof } from 'ts-simple-nameof'

interface Param {
	personId: number
	initDataGrid: (dataGrid: DataGrid) => void
	onSelect: (value: dto.SoldAbonnement) => void
}

const SoldAbonnementsTable = ({ personId, initDataGrid, onSelect }: Param) => {
	const onSelectClick = (e: any) => {
		e.event.preventDefault()
		onSelect(e.row.data)
	}

	return (
		<DataGrid
			ref={ref => {
				if (ref) initDataGrid(ref)
			}}
			dataSource={abonnementsStore(personId)}
			remoteOperations={true}
			columnAutoWidth={true}
			rowAlternationEnabled={true}
			showBorders={false}
			showRowLines={true}
		>
			{/**/}
			<Editing
				useIcons={true}
				allowUpdating={false}
				allowAdding={false}
				allowDeleting={false}
			/>
			{/**/}
			<Scrolling rowRenderingMode='virtual' />
			<Paging defaultPageSize={10} />
			<Pager
				visible={true}
				allowedPageSizes={true}
				displayMode='full'
				showPageSizeSelector={10}
				showInfo={true}
				showNavigationButtons={true}
			/>
			{/**/}
			<FilterRow visible={true} />
			{/**/}
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.id)}
				caption={'ID'}
				dataType='number'
				allowHeaderFiltering={false}
				allowEditing={false}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.active)}
				caption={'Active'}
				dataType='boolean'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.name)}
				caption={'Abonnement name'}
				dataType='string'
				allowHeaderFiltering={false}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.dateSale)}
				caption={'Date Sale'}
				dataType='date'
				allowHeaderFiltering={true}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.dateExpiration)}
				caption={'Date expiration'}
				dataType='date'
				format={'shortDate'}
				allowHeaderFiltering={true}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.visitCounter)}
				caption={'Number of visits'}
				dataType='number'
				allowHeaderFiltering={true}
				cellRender={data => {
					return (
						<div key={data.row.data}>
							{data.value}/{data.row.data.maxNumberOfVisits}
						</div>
					)
				}}
			/>
			<Column
				dataField={nameof<dto.SoldAbonnement>(o => o.lessons)}
				caption={'Lessons'}
				allowHeaderFiltering={false}
				allowSearch={false}
				minWidth={'180'}
				cellRender={data =>
					data.value.map(lesson => (
						<span key={lesson.id} className='badge bg-secondary me-1'>
							{lesson.name}
						</span>
					))
				}
			/>
			<Column type='buttons'>
				<Button hint={'Info'} icon='info' onClick={onSelectClick} />
			</Column>
			{/**/}
		</DataGrid>
	)
}

export default SoldAbonnementsTable
