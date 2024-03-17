import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import {HistoryAnalysed, ServiceTime} from '../../types';
import dayjs from "dayjs";
import {convertirMinutesEnHeureMinutes} from "../../utils/functions"; // Assurez-vous que le chemin d'accès est correct

const RealTime = (val:number) => {
    return dayjs(val).format('DD-MM-YYYY HH:mm:ss')

}

const columns = [
    { id: 'pds', label: 'PDS', minWidth: 170, align: "center", format:(value:number) => RealTime(value) },
    { id: 'fds', label: 'FDS', minWidth: 170 , align: "center", format:(value:number) => RealTime(value)},
    { id: 'workingTime', label: 'Temps Estimé (min)', minWidth: 100, align: 'center', format: (value: number) => convertirMinutesEnHeureMinutes(value) },
    { id: 'productivityScore', label: 'Production Score', minWidth: 100, align: 'center', format: (value: number) => value },

];

const PdsHistoryTable: React.FC<{ data: ServiceTime[] }> = ({ data }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}

                                    style={{ minWidth: column.minWidth, textAlign: "center" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id as keyof ServiceTime];
                                    return (
                                        <TableCell key={column.id}   style={{ textAlign: "center" }} >
                                            {typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PdsHistoryTable;