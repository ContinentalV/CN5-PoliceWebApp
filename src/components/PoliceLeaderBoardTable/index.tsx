import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {AgentData, Column} from '../../types';
import {convertirMinutesEnHeureMinutes} from "../../utils/functions";

const columns: Column[] = [
    {
        id: 'avatar',
        label: '#',
        minWidth: 70,
        align: 'center',
        format: (value: string) => <img className="avatar-police" src={value} alt="Avatar"/>
    },
    {id: 'nomRP', label: 'AGENT', minWidth: 100, align: 'center'},
    {id: 'matricule', label: 'MATRICULE', minWidth: 10, align: 'center'},
    {
        id: 'inService',
        label: 'ACTIF',
        minWidth: 10,
        align: 'center',
        format: (value: boolean) => value ? "🟢🟢" : "🔴🔴"
    },
    {
        id: "tempsTotalService",
        label: "HEURES",
        align: "center",
        minWidth: 150,
        format: value => convertirMinutesEnHeureMinutes(value)
    },
    {
        id: "salary",
        label: "SALAIRE",
        align: "center",
        format: value => value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    },


];

const PoliceLeaderBoardTable: React.FC<{
    data: AgentData[],
    handlePoliceSelect: (id: string) => void,

}> = ({data, handlePoliceSelect}) => {
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
        <Paper className="custom-table" sx={{width: '100%', maxWidth: '600px', overflow: 'hidden', margin: 'auto'}}>
            <TableContainer sx={{maxHeight: 540}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data

                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    hover
                                    onClick={() => handlePoliceSelect(row.discordId)}
                                    key={row.discordId}


                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format ? (
                                                        column.format(value)
                                                    )
                                                    : (
                                                        value
                                                    )}
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

export default PoliceLeaderBoardTable;
