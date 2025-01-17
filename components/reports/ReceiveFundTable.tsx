import { Space, Tooltip, Table, Pagination, Row, Col, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetchTransaction } from "@/services/fetcher";
import { ColumnsType } from "antd/es/table";
import convertVNDMoney from "@/utils/money-format";
import { formatRequestCreate } from "@/utils/date-format";
import { VscListFilter } from "react-icons/vsc";

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
    readonly fund_name : string;
}

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


function useFundTransaction(offset: number, queryTimeParams: string, searchText: string) {
	const { data, error, isLoading } = useSWR(
		`/transaction/guest-get-fund-transaction?page=${offset * 10 - 10}${queryTimeParams}${searchText}`,
		fetchTransaction
	);

	return {
		donorsData: data,
		isLoading,
		isError: error,
	};
}


const ReceiveFundTable = (props: Props) => {
	const [offset, setOffset] = useState(1);
	const [queryTimeParams, setTimeQueryParams] = useState('');
	const [searchText, setSearchText] = useState('');
	const [currentText, setCurrentText] = useState('')
	const [timeFilterData, setTimeFilterData] = useState<string|number>('');
	const { donorsData, isLoading, isError } = useFundTransaction(offset, queryTimeParams, searchText);

	const handlePaginationChange = (value: any) => {
		console.log({ value });
		setOffset(value);
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
        <>
            {
                !isLoading ?
                <div className="">
                    <h1 className="my-8 text-center text-xl uppercase font-medium">
                        Bảng thống kê giao dịch về quỹ sự kiện
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
                        pagination={false}
                        // loading={listRequestData.isLoading}
                    ></Table>
                    <Pagination
                        className="mt-4 px-2 float-right"
                        // defaultCurrent={1}
                        onChange={handlePaginationChange}
                        total={donorsData.DT.count}
                        showTotal={(total) => `Tổng cộng ${total} giao dịch`}
                    />
                </div>
                : 
                <></>
            }
        </>
	);
};

export default ReceiveFundTable;
