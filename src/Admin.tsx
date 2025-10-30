import { api } from '../convex/_generated/api'
import { useQuery } from 'convex/react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
import { Card } from './components/ui/card'

function Admin() {
  const guests = useQuery(api.guests.getGuests)

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card className="px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Coming</TableHead>
                <TableHead className="text-right">Kids</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests?.map((guest) => (
                <TableRow key={guest._id}>
                  <TableCell className="font-medium">
                    {guest.firstName}
                  </TableCell>
                  <TableCell>{guest.lastName}</TableCell>
                  <TableCell>{guest.isComing ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    {guest.totalKids || ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {guests?.reduce(
                    (acc, guest) => acc + (guest.totalKids || 0),
                    0,
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </div>
    </div>
  )
}

export default Admin
