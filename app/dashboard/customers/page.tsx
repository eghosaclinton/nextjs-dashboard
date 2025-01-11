import { Metadata } from 'next'
import CustomersTable from '@/app/ui/customers/table'
import Pagination from '@/app/ui/invoices/pagination'
import { Suspense } from 'react'
import { fetchFilteredCustomers, fetchCustomerPages } from '@/app/lib/data'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'

export const metadata: Metadata = {
    title: 'Customers',
}

export default async function Page(props: {
    searchParams?: Promise<{ query?: string; page?: string }>
}) {
    const searchParams = await props.searchParams
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const customers = await fetchFilteredCustomers(query, currentPage)
    const totalPages = await fetchCustomerPages(query)

    return (
        <main className="w-full">
            <Suspense fallback={<InvoicesTableSkeleton />}>
                <CustomersTable customers={customers} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    )
}
