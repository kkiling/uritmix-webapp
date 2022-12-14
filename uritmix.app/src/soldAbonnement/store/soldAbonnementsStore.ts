import CustomStore from 'devextreme/data/custom_store'
import { Api, dto } from 'uritmix.api'
import { Paginator } from '../../base/paginator'
import { catchHttp, checkErrors } from '../../base/catchError'

const soldAbonnementsStore = (personId: number) => {
	let totalCount = 0
	let abonnements: dto.SoldAbonnement[] = []
	return new CustomStore({
		key: 'id',
		load: async options => {
			if (options.searchOperation != 'contains') return []

			try {
				const response = await Api.abonnementApi.apiV1AbonnementSoldPersonIdGet(
					personId,
					Paginator.paginatorPageSize(options.skip, options.take),
					Paginator.paginatorPageNumber(options.skip, options.take)
				)
				checkErrors(response)
				totalCount = response.data.result?.totalRecords!
				abonnements = response.data.result?.results!
				return abonnements
			} catch (error) {
				catchHttp(error, (errorMessage: string) => {
					throw errorMessage
				})
			}
			return []
		},
		totalCount: () => {
			return Promise.resolve(totalCount)
		}
	})
}

export default soldAbonnementsStore
