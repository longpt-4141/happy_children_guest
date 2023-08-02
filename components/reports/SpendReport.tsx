import { fetchTransaction } from "@/services/fetcher";
import { formatRequestCreate } from "@/utils/date-format";
import convertVNDMoney from "@/utils/money-format";
import { Descriptions, List, Tooltip, Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import useSWR from "swr";
import ButtonWrapper from "../button/ButtonWrapper";

type Props = {};

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

function useRegularReport() {
	const { data, error, isLoading } = useSWR(
		`/reports/guest-get-all-reports`,
		fetchTransaction
	);

	return {
		reportData: data,
		isReportLoading: isLoading,
		isReportError: error,
	};
}

const SpendReport = (props: Props) => {
	const { reportData, isReportLoading, isReportError } = useRegularReport();

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
						className="report-list__table--button__delete flex items-center justify-center"
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
				<div>
					{!isReportLoading ? (
						<Table
							columns={columns}
							dataSource={reportData.map(
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
							pagination={{
								showSizeChanger: true,
							}}
							expandable={{
								expandedRowRender: (record: any) => (
									<>
										<Descriptions
											title="Thông tin bổ sung"
											className="sub_description"
										>
											<Descriptions.Item label="Địa chỉ">
												{record.address}
											</Descriptions.Item>
											<Descriptions.Item label="Số điện thoại">
												{record.phone_number}
											</Descriptions.Item>
										</Descriptions>
										<div>
											<List
												// itemLayout="horizontal"
												dataSource={record.receipts}
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
							// loading={listRequestData.isLoading}
						></Table>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpendReport;
