import { Metadata } from 'next'
import CustomersTable from '@/app/ui/customers/table'
import { Suspense } from 'react'
import { fetchFilteredCustomers } from '@/app/lib/data'

export const metadata: Metadata = {
    title: 'Customers',
}

export default async function Page(props: {
    searchParams?: Promise<{ query?: string; page?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    // const currentPage = Number(searchParams?.page) || 1
    const customers = await fetchFilteredCustomers(query)
    return (
        <div className="w-full">
            <Suspense fallback={<h1>Loading</h1>}>
                <CustomersTable customers={customers} />
            </Suspense>
            {/* <div className="mt-5 flex w-full justify-center">
                        <Pagination totalPages={totalPages} />
                    </div> */}
        </div>
    )
}
