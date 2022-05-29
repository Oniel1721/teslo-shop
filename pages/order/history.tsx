import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns:GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant='outlined'/>
          : <Chip color='error' label='No pagada' variant='outlined'/>
      )
    }
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 100,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/order/${params.row.id}`} passHref>
            <Link underline='always'>
                Ver orden
            </Link>
        </NextLink>
      )
    }
  }

]

const rows = [
  { id: 1, paid: true, fullname: 'Oniel Santos' },
  { id: 2, paid: false, fullname: 'Oniel Santos2' },

  { id: 3, paid: true, fullname: 'Oniel Santos3' },

  { id: 4, paid: false, fullname: 'Oniel Santos4' },

  { id: 5, paid: true, fullname: 'Oniel Santos5' }

]
const OrderHistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        <Grid container>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderHistoryPage
