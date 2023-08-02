import { fetchTransaction } from "@/services/fetcher";
import { formatRequestCreate } from "@/utils/date-format";
import convertVNDMoney from "@/utils/money-format";
import { Space, Tooltip, Table, Pagination, Row, Col, Select, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useSWRConfig } from "swr";
import useSWR from "swr";
import ShortLogo from "../../public/img/logo/short_logo.svg";
import CardBg from "../../public/img/bg/card_bg.svg";
import VietcombankLogo from "../../public/img/bg/vietcombank_logo.svg";
import { VscListFilter } from "react-icons/vsc";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip as ChartTooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ReceiveFundTable from "./ReceiveFundTable";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	ChartTooltip,
	Legend
);


export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "ĐỒ THỊ TIỀN VÀO",
			font: {
				size: 18,
			},
		},
	},
	scales: {
		y: {
			grid: {
				drawBorder: false, // <-- this removes y-axis line
				lineWidth: function (context: any) {
					return context?.index === 0 ? 0 : 1; // <-- this removes the base line
				},
			},
		},
		x: {
			grid: {
				drawBorder: false,
				lineWidth: 0, // <-- this removes vertical lines between bars
			},
		},
	},
};

const months = [
	{
		label : 'tháng 1',
		value : 1
	},
	{
		label : 'tháng 2',
		value : 2
	},
	{
		label : 'tháng 3',
		value : 3
	},
	{
		label : 'tháng 4',
		value : 4
	},
	{
		label : 'tháng 5',
		value : 5
	},
	{
		label : 'tháng 6',
		value : 6
	},
	{
		label : 'tháng 7',
		value : 7
	},
	{
		label : 'tháng 8',
		value : 8
	},
	{
		label : 'tháng 9',
		value : 9
	},
	{
		label : 'tháng 10',
		value : 10
	},
	{
		label : 'tháng 11',
		value : 11
	},
	{
		label : 'tháng 12',
		value : 12
	},
]

const labels = [
	"tháng 1",
	"tháng 2",
	"tháng 3",
	"tháng 4",
	"tháng 5",
	"tháng 6",
	"tháng 7",
	"tháng 8",
	"tháng 9",
	"tháng 10",
	"tháng 11",
	"tháng 12",
];

type Props = {};

interface TransactionObj {
	readonly id: number;
	readonly username: string;
	readonly email: string;
	readonly address?: string | null;
	readonly phone_number?: string | null;
	readonly send_amount: string;
	readonly exact_amount: string;
	readonly message?: string | null;
	readonly createAt: string;
	readonly updateAt: string;
}

function useTransaction(offset: number, queryTimeParams : string, searchText: string) {
	const { data, error, isLoading } = useSWR(
		`/transaction/get-for-guest?page=${offset * 10 - 10}${queryTimeParams}${searchText}`,
		fetchTransaction
	);

	return {
		donorsData: data,
		isLoading,
		isError: error,
	};
}

function useChartData(chartConditionFilter: string) {
	const { data, error, isLoading } = useSWR(
		`/transaction/get-chart-data?per=${chartConditionFilter}`,
		fetchTransaction
	);

	return {
		chartData: data,
		isChartLoading: isLoading,
		isChartError: error,
	};
}

const ReceiveReport = (props: Props) => {
	const [offset, setOffset] = useState(1);
	const [chartConditionFilter, setChartConditionFilter] = useState("month");
	const [queryTimeParams, setTimeQueryParams] = useState('');
	const [searchText, setSearchText] = useState('');
	const [currentText, setCurrentText] = useState('')
	const [timeFilterData, setTimeFilterData] = useState<string|number>('');
	

	const handlePaginationChange = (value: any) => {
		console.log({ value });
		setOffset(value);
	};

	const { donorsData, isLoading, isError } = useTransaction(offset, queryTimeParams, searchText);
	const { chartData, isChartLoading } = useChartData(chartConditionFilter);
	console.log({ donorsData });

	const onChange = (value: string) => {
		console.log(`selected ${value}`);
		setChartConditionFilter(value);
	};

	const onTimeFilterChange = (value: string|number) => {
		console.log(`selected ${value}`);
		setTimeQueryParams(`&time=${value}`)
		setTimeFilterData(value)
	}

	const renderFilterOption = () => {
		const d = new Date();
		const currentMonth = d.getMonth();
		return months.filter((item, index) => index <= currentMonth)
	}

	
	const onSearchName = (value: string) => {
		console.log(value);
		setSearchText(`&username=${value}`);
	}


	const data = {
		labels,
		datasets: [
			{
				label: "Quỹ chung",
				data: isChartLoading ? null : chartData.normalChartData,
				backgroundColor: "#FEE8C2",
				borderRadius: 6,
			},
			{
				label: "Quỹ cho sự kiện",
				data: isChartLoading ? null : chartData.fundChartData,
				backgroundColor: "#F89A85",
				borderRadius: 6,
			},
		],
	};

	const columns: ColumnsType<TransactionObj> = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "STT",
			width: "5%",
			responsive: ["md"],
		},
		{
			title: "Họ và tên",
			dataIndex: "username",
			key: "username",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			responsive: ["md"],
			render: (name: string, record: TransactionObj) => (
				<Tooltip placement="topLeft" title={name}>
					{name}
				</Tooltip>
			),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			render: (email: string, record: TransactionObj) => (
				<Tooltip placement="topLeft" title={email}>
					{email}
				</Tooltip>
			),
		},
		{
			title: "Số tiền",
			dataIndex: "exact_amount",
			key: "exact_amount",
			width: "10%",
			ellipsis: {
				showTitle: true,
			},
			render: (exact_amount: string) => (
				<>
					<Tooltip
						placement="topLeft"
						title={convertVNDMoney(Number(exact_amount))}
					>
						<p
							style={{
								color: "rgb(14 160 97)",
								fontWeight: "500",
								fontSize: "16px",
							}}
						>
							{" "}
							+ {convertVNDMoney(Number(exact_amount))}
						</p>
					</Tooltip>
				</>
			),
		},
		{
			title: "Lời nhắn",
			dataIndex: "message",
			key: "message",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			responsive: ["md"],
			render: (message: string) => (
				<>
					<Tooltip placement="topLeft" title={message}>
						{message}
					</Tooltip>
				</>
			),
		},
		{
			title: "Ngày chuyển",
			dataIndex: "createdAt",
			key: "createdAt",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			render: (date: string) => (
				<Tooltip placement="topLeft" title={formatRequestCreate(date)}>
					{formatRequestCreate(date)}
				</Tooltip>
			),
		},
	];
	return (
		<div className="font-Montserrat">
			<Marquee
				className="bg-subPink rounded-lg py-4 px-3 border-2 !border-mainPink"
				// gradient={true}
				// gradientColor={[239, 131, 111]}
				pauseOnHover
			>
				<Space size="large">
					{donorsData ? (
						donorsData.DT.rows.map((donor: TransactionObj) => {
							return (
								<div
									key={donor.id}
									className="flex gap-2 items-center mr-4"
								>
									<p className="font-Montserrat">
										{donor.username} đã quyên góp
									</p>
									<div className="text-mainPink font-medium text-base">
										{convertVNDMoney(
											Number(donor.exact_amount)
										)}
									</div>
								</div>
							);
						})
					) : (
						<></>
					)}
				</Space>
			</Marquee>
			<div className="mt-8 mb-4">
				<Row>
					<Col
						span={1}
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<VscListFilter
							style={{
								fontSize: "22px",
								color: "var(--mainColor)",
							}}
						/>
					</Col>
					<Col span={6}>
						<Select
							showSearch
							placeholder="Thống kê theo"
							optionFilterProp="children"
							defaultValue="month"
							onChange={onChange}
							filterOption={(input, option) =>
								(option?.label ?? "")
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							options={[
								{
									value: "month",
									label: "Theo tháng",
								},
								{
									value: "year",
									label: "Theo năm",
								},
							]}
						/>
					</Col>
				</Row>
			</div>
			{isLoading ? (
				<></>
			) : (
				<div>
					<div className="py-10 ">
						<Row>
							<Col span={9}>
								<div className="w-full h-60  rounded-xl bg-mainPink p-4 font-Montserrat relative">
									<div className="absolute right-6 top-0">
										<VietcombankLogo
											width={100}
											height={70}
										/>
									</div>
									<div className="flex items-center gap-4">
										<ShortLogo width={40} height={40} />
										<div className="uppercase text-white font-semibold tracking-wide">
											tài khoản
										</div>
									</div>
									<Space
										direction="vertical"
										size={15}
										className="mt-6 px-1"
									>
										<div className="text-white">
											<p>Tên tài khoản</p>
											<p className="uppercase text-xl font-semibold tracking-wider">
												PHAM THANH LONG
											</p>
										</div>
										<div className="text-white">
											<p>Số tài khoản</p>
											<p className="uppercase text-xl font-semibold tracking-widest">
												1021681661
											</p>
										</div>
									</Space>
									<div className="absolute right-4 bottom-2">
										<CardBg width={150} height={120} />
									</div>
								</div>
							</Col>
							<Col span={14} className="px-3">
								<Bar options={options} data={data} />
							</Col>
						</Row>
					</div>
					<div className="">
						<h1 className="my-8 text-center text-xl uppercase font-medium">
							Bảng thống kê giao dịch về quỹ chung
						</h1>
						<div className="mt-8 mb-4">
							<Row>
								<Col
									span={1}
									style={{
										display: "flex",
										justifyContent: "space-evenly",
										alignItems: "center",
									}}
								>
									<VscListFilter
										style={{
											fontSize: "22px",
											color: "var(--mainColor)",
										}}
									/>
								</Col>
								<Col span={4} offset={1}>
									<Select
										showSearch
										placeholder="Thống kê theo"
										optionFilterProp="children"
										onChange={onTimeFilterChange}
										defaultValue={timeFilterData === '' ? undefined : timeFilterData}
										allowClear
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toString()
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										// options={renderFilterOption()}
									>
											{
												months.filter((item, index) => index <= (new Date()).getMonth()).map((month) => (
												<Select.Option key={month.value}>
														{
															month.label
														}
												</Select.Option>
													
												))
											}
											<Select.Option value="today">
												Hôm nay
											</Select.Option>
									</Select>
								</Col>
								<Col span={6} >
									<Input.Search defaultValue={currentText} onChange={(e) => setCurrentText(e.target.value)} allowClear placeholder="Tìm kiếm theo tên" onSearch={onSearchName} enterButton />
								</Col>
							</Row>
						</div>
						<Table
							className="mt-10 font-Montserrat"
							columns={columns}
							dataSource={donorsData.DT.rows.map(
								(data: TransactionObj, index: number) => ({
									...data,
									stt: 10 * offset - 10 + index + 1,
									key: data.id,
								})
							)}
							pagination={false}
							summary={(pageData) => {
								let totalReceivedMoney = 0;

								pageData.forEach(({ exact_amount }) => {
									totalReceivedMoney +=
										parseInt(exact_amount);
								});

								return (
									<>
										<Table.Summary.Row>
											<Table.Summary.Cell index={0}>
												Tổng cộng
											</Table.Summary.Cell>
											<Table.Summary.Cell index={1}>
												<div
													style={{
														color: "rgb(14 160 97)",
														fontWeight: "500",
														fontSize: "16px",
													}}
												>{convertVNDMoney(donorsData.DT.total_money)}</div>
											</Table.Summary.Cell>
										</Table.Summary.Row>
									</>
								);
							}}
							// loading={listRequestData.isLoading}
						></Table>
						<Pagination
							className="mt-4 px-2 float-right"
							// defaultCurrent={1}
							onChange={handlePaginationChange}
							total={donorsData.DT.count}
							showTotal={(total) =>
								`Tổng cộng ${total} giao dịch`
							}
						/>
					</div>
				</div>
			)}
			<div className="mt-20">
				<ReceiveFundTable />
			</div>
		</div>
	);
};

export default ReceiveReport;
