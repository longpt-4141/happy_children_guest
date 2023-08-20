import { fetchTransaction } from "@/services/fetcher";
import { formatRequestCreate } from "@/utils/date-format";
import convertVNDMoney from "@/utils/money-format";
import { Descriptions, List, Tooltip, Table, Button, Row, Col, Select, Input, Pagination } from "antd";
import { ColumnsType } from "antd/es/table";
import React, {useState} from "react";
import useSWR from "swr";
import ButtonWrapper from "../button/ButtonWrapper";
import { VscListFilter } from "react-icons/vsc";

type Props = {};
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

interface reportObj {
	readonly id: number;
	readonly center_name: string;
	readonly email: string;
	readonly address?: string | null;
	readonly phone_number?: string | null;
	readonly send_amount: string;
	readonly exact_amount: string;
	readonly message?: string | null;
	readonly createAt: string;
	readonly updateAt: string;
	readonly fund_name: string;
}

function useRegularReport(offset: number, queryTimeParams: string, searchText: string) {
	const { data, error, isLoading } = useSWR(
		`/reports/guest-get-all-reports?page=${offset * 10 - 10}${queryTimeParams}${searchText}`,
		fetchTransaction
	);

	return {
		reportData: data,
		isReportLoading: isLoading,
		isReportError: error,
	};
}

const SpendReport = (props: Props) => {
	const [offset, setOffset] = useState(1);
	const [queryTimeParams, setTimeQueryParams] = useState('');
	const [searchText, setSearchText] = useState('');
	const [currentText, setCurrentText] = useState('')
	const [timeFilterData, setTimeFilterData] = useState<string|number>('');
	const { reportData, isReportLoading, isReportError } = useRegularReport(offset, queryTimeParams, searchText);

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


	const columns: ColumnsType<any> = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "STT",
			width: "5%",
			responsive: ["md"],
		},
		{
			title: "Tên trung tâm",
			dataIndex: "center_name",
			key: "center_name",
			width: "20%",
			ellipsis: {
				showTitle: true,
			},
			responsive: ["md"],
			render: (name: string, record: any) => (
				<Tooltip placement="topLeft" title={name}>
					{name}
				</Tooltip>
			),
		},
		{
			title: "Số tiền",
			dataIndex: "total_pay_money",
			key: "total_pay_money",
			width: "10%",
			ellipsis: {
				showTitle: true,
			},
			render: (total_pay_money: string) => (
				<>
					<Tooltip
						placement="topLeft"
						title={convertVNDMoney(Number(total_pay_money))}
					>
						<p
							style={{
								color: "rgb(14 160 97)",
								fontWeight: "500",
								fontSize: "16px",
							}}
						>
							{convertVNDMoney(Number(total_pay_money))}
						</p>
					</Tooltip>
				</>
			),
		},
		{
			title: "Thông tin yêu cầu",
			dataIndex: "request_description",
			key: "request_description",
			width: "30%",
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
			title: "Ngày báo cáo",
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
		{
			title: "Tài liệu báo cáo",
			dataIndex: "payment_file_url",
			key: "payment_file_url",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			render: (payment_file_url: string) => (
				<Tooltip placement="topLeft" title="Nhấp để xem tài liệu">
					<Button
						className="report-file flex items-center justify-center border-none !bg-white shadow-md hover:bg-mainPink"
						// icon={<CloseOutlined/>}
						shape="circle"
					>
						<ButtonWrapper link={payment_file_url} />
					</Button>
				</Tooltip>
			),
		},
	];

	return (
		<div>
			<div>
				<h1 className="my-8 text-center text-xl uppercase font-medium">
					Bảng thống kê tiền chi tiêu quỹ chung
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
				<div>
					{!isReportLoading ? (
						<>
						<Table
							columns={columns}
							dataSource={reportData.rows.map(
								(data: any, index: number) => ({
									stt: index + 1,
									key: data.id,
									id: data.id,
									center_name: data.request.center.name,
									center_id: data.request.center.id,
									request_description:
										data.request.description,
									...data,
								})
							)}
							// pagination={{
							// 	showSizeChanger: true,
							// }}
							expandable={{
								expandedRowRender: (record: any) => (
									<>
										<Descriptions
											title="Thông tin về các hóa đơn"
											className="sub_description"
										>
											{/* <Descriptions.Item label="Địa chỉ">
												{record.address}
											</Descriptions.Item>
											<Descriptions.Item label="Số điện thoại">
												{record.phone_number}
											</Descriptions.Item> */}
										</Descriptions>
										<div>
											<List
												// itemLayout="horizontal"
												dataSource={record.receipts}
												className="border-solid border-1 border-red-400 rounded-lg bg-white shadow-sm"
												renderItem={(
													item: any,
													index
												) => (
													<List.Item>
														<List.Item.Meta
															title={
																<div>
																	{
																		item.receipt_name
																	}
																</div>
															}
															description={
																<>
																	<div
																		style={{
																			color: "rgb(14 160 97)",
																			fontWeight:
																				"500",
																			fontSize:
																				"16px",
																		}}
																	>
																		{convertVNDMoney(
																			item.pay_money
																		)}
																	</div>
																	<b>+ Thuế : {item.tax} %</b>
																</>
															}
														/>
													</List.Item>
												)}
											/>
										</div>
									</>
								),
								// rowExpandable: true ,
							}}
							pagination={false}
							// loading={listRequestData.isLoading}
						></Table>
												<Pagination
							className="mt-4 px-2 float-right"
							// defaultCurrent={1}
							onChange={handlePaginationChange}
							total={reportData.count}
							// showTotal={(total) =>
							// 	`Tổng cộng ${total} báo cáo`
							// }
						/>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpendReport;
