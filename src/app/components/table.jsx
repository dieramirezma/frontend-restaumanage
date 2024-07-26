import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

const getKeyValue = (obj, key) => obj[key]

export default function TableContent ({ columns, data, classNames, className, bottomContent, bottomContentPlacement }) {
  return (
    <div className='relative overflow-x-auto'>
      <Table
        bottomContent={bottomContent}
        bottomContentPlacement={bottomContentPlacement}
        selectionMode="single"
        removeWrapper aria-label="Example static collection table"
        classNames={classNames}
        className={className}
      >
        <TableHeader>
          {columns.map((column) => <TableColumn key={column.key}>{column.label}</TableColumn>)}
        </TableHeader>
        <TableBody>
          {data.map((row) =>
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>{getKeyValue(row, column.key)}</TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
