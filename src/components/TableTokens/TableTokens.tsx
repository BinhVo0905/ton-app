import { FC } from "react";
import { TableCell, TableRow, TableHead, TableContainer, TableBody, Paper, Table } from "@mui/material";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { Token } from "@/data/types";
import { formatNumber } from "@/utils/convertNumbThousand";
import Image from "next/image";
import { TokensApi } from "@/apis/tokensApi";
interface TableTokensProps {
    perPage: number;
}
const PercentCell = ({ percent }: { percent: number }) => {
    return <div className="flex items-center" style={{ float: "right" }}>
        {percent > 0 ? <ChevronUpIcon className="h3 w-3 text-green-700" /> : <ChevronDownIcon className="h3 w-3 text-red-700" />}
        <span className={
            ` ${percent > 0 ? "text-green-500" : "text-red-500"} font-bold`
        }>{Math.abs(percent).toFixed(2)}</span>
    </div>

}

const TableTokens: FC<TableTokensProps> = ({ perPage }) => {
    const { data: tokens, isLoading } = useQuery({ queryKey: ["tokens"], queryFn: () => TokensApi.getListTokens(perPage) });
    if (isLoading) return <></>;
    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow className="font-bold">
                    <TableCell sx={{ fontWeight: "bold" }} align="center">#</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">1h %</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">24h %</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">7d %</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Market Cap</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Volume (24h)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(tokens as Token[] || []).map((token) => (
                    <TableRow
                        key={token.market_cap_rank}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{token.market_cap_rank}</TableCell>
                        <TableCell component="th" scope="row">
                            <div className="flex items-center">
                                <Image src={token.image} width={60} height={60} alt="" className="w-4 lg:w-6 mr-4" />
                                <span> {token.name}</span>
                            </div>

                        </TableCell>
                        <TableCell align="right">${token.current_price}</TableCell>
                        <TableCell align="right"> <PercentCell percent={token.price_change_percentage_1h_in_currency} /></TableCell>
                        <TableCell align="right"><PercentCell percent={token.price_change_percentage_24h_in_currency} /></TableCell>
                        <TableCell align="right"><PercentCell percent={token.price_change_percentage_7d_in_currency} /></TableCell>
                        <TableCell align="right">${formatNumber(token.market_cap)}</TableCell>
                        <TableCell align="right">${formatNumber(token.total_volume)}</TableCell>


                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}
export default TableTokens;