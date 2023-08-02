import React from "react";
import {
	Form,
	Row,
	Col,
	Input,
	Select,
	InputNumber,
	Button,
	Tooltip,
} from "antd";
import { toastSuccess } from "@/utils/toast-popup";
import { makeItemDonation } from "@/services/donate";
import { fetchTransaction } from "@/services/fetcher";
import useSWR from 'swr'

type Props = {};

interface FundObj  {
    id : number;
    name : string;
    description : string;
    end_at : string;
    createdAt : string;
    updatedAt : string;
}

function useFund() {
	const { data, error, isLoading } = useSWR(
		`/transaction/get-all-funds`,
		fetchTransaction
	);

	return {
		fundsData: data,
		isFundsLoading: isLoading,
		isFundsError: error,
	};
}

const ItemDonate = (props: Props) => {
	const [form] = Form.useForm();
    const {Option} = Select

    const {fundsData, isFundsLoading} = useFund()


	const onFinish = (values: any) => {
        console.log({values})
		// dispatch(createNewRequest({requestData, navigate}))
        form.validateFields()
			.then(async (value) => {
				// Here make api call of something else
				console.log({ value });
				const transaction = {
					...value,
				};
				const res = await makeItemDonation(transaction);
				toastSuccess(
					"Bạn đã gửi yêu cầu từ thiện thành công, trân thành cảm ơn tấm lòng của bạn !"
				);
				console.log(res);
			})
			.catch((err) => console.log({err}));
	};
	return (
		<div>
			<div className="text-center">
				<div className="uppercase text-3xl mb-4">
					Quyên góp hiện vật
				</div>
				<p className="w-[2px] h-10 bg-mainPink m-auto"></p>
				<div className="mt-4">
					<p className="text-lg font-medium">
						Đây là quỹ quyên góp bằng hiện vật
					</p>
					<br />
					Các nhà hảo tâm sẽ điền form mong muốn quyên góp,
					<br />
					chúng tôi sẽ duyệt sau khi liên hệ với nhà hảo tâm qua thông
					tin liên lạc.
				</div>
			</div>
			<div className="request--add__page py-10 w-2/3 m-auto mt-8 rounded-lg">
				<Row>
					<Col span={12} offset={6}>
						<div className="request--add__form font-Montserrat">
							<div className="form--title mb-3">
								<h4
									style={{
										color: "var(--mainColor)",
										fontSize: "18px",
										fontWeight: "600",
										textAlign: "center",
										textTransform: "uppercase",
									}}
								>
									Đơn yêu cầu
								</h4>
							</div>
							<div className="form--inner">
								<Form
									form={form}
									onFinish={onFinish}
									layout="vertical"
								>
									<Form.Item
										label="Họ và tên"
										name="username"
										rules={[
											{
												required: true,
												message:
													"Hãy nhập tên của bạn!",
											},
										]}
										className="donate-form font-"
									>
										<Input />
									</Form.Item>

									<Form.Item
										className="donate-form"
										label={<p className="email">Email</p>}
										name="email"
										rules={[
											{
												required: true,
												type: "email",
												message:
													"Bạn vui lòng nhập địa chỉ mail của bạn!",
											},
										]}
									>
										<Input />
									</Form.Item>

									<Form.Item
										className="donate-form"
										label={<p>Địa chỉ</p>}
										name="address"
										// rules={[{ required: true, message: 'Please input your password!' }]}
									>
										<Input />
									</Form.Item>

									<Form.Item
										className="donate-form"
										label={<p>Số điện thoại</p>}
										name="phone_number"
										// rules={[{ required: true, message: 'Please input your password!' }]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										name="description"
										label="Mô tả yêu cầu :"
										rules={[
											{
												required: true,
												message:
													"Bạn chưa ghi rõ yêu cầu",
											},
										]}
									>
										<Input.TextArea
											placeholder="Hãy mô tả yêu cầu của bạn"
											rows={6}
											maxLength={255}
											showCount
										/>
									</Form.Item>
                                    <Form.Item
                                        className="donate-form"
                                        name="fundId"
                                        label={<p>Quỹ nếu có</p>}
                                    >
                                        {
                                            !isFundsLoading ? 
                                            <Select
                                                showSearch
                                                placeholder="Tên quỹ"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (option?.label ?? "")
                                                        .toString()
                                                        .toLowerCase()
                                                        .includes(input.toLowerCase())
                                                }
                                                // options={
                                                //         fundsData
                                                //         .map((fund : FundObj) => ({
                                                //         ...fund,
                                                //         label : <p>{fund.name}</p>,
                                                //         value : fund.id
                                                //         }))
                                                // }
                                            >
                                                <Option value={null}>
                                                    Không có 
                                                </Option>
                                                {
                                                    fundsData.map((fund : FundObj) => {
                                                        return (
                                                        <Option key={fund.id.toString()} value={fund.id.toString()}>
                                                            {fund.name}
                                                        </Option>
                                                    )})
                                                }
                                            </Select>
                                            :
                                            null
                                        }
                                    </Form.Item>
									<Form.Item
										wrapperCol={{
											offset: 13,
											span: 11,
										}}
									>
										<Button
											type="primary"
											htmlType="submit"
											style={{
												float: "right",
											}}
										>
											Tạo mới yêu cầu
										</Button>
									</Form.Item>
								</Form>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ItemDonate;
