import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Transactions() {
  return (
    <Card>
        <CardHeader className="px-7">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>Recent Orders from your stores!</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p className="font-medium">Alex Anie</p>
                            <p className="hidden md:flex text-sm text-muted-foreground">test@test.com</p>
                        </TableCell>
                        <TableCell>Sale</TableCell>
                        <TableCell>Successfull</TableCell>
                        <TableCell>2024-06-15</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)
}
