import React, { useEffect } from 'react'
import { Button, Checkbox, Divider, Form, Input,InputNumber,message, Select, Steps, theme } from 'antd';
import { useState } from 'react';
import { getBanksInfo, getQRCodeImage, sendDonateTransaction } from '@/services/donate';
import Image from 'next/image';
import { toastSuccess } from '@/utils/toast-popup';
import useSWR from "swr";
import { fetchTransaction } from '@/services/fetcher';
import ReactDomServer from 'react-dom/server';
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

const FundDonate = (props: Props) => {
	const [form] = Form.useForm();
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [donorInfo, setDonorInfo] = useState({
		username: "",
		email: "",
	});
	const [banksInfo, setBanksInfo] = useState([]);
	const [QRCodeImage, setQRCodeImage] = useState("");

    const {fundsData, isFundsLoading} = useFund()

	const next = () => {
		form.validateFields()
			.then((value) => {
				// Here make api call of something else
				setCurrent(current + 1);
				console.log({ value });
				setDonorInfo({ ...value });
			})
			.catch((err) => console.log(err));
	};
	const prev = () => {
		setCurrent(current - 1);
	};


	const handleRenderQRCode = () => {
		form.validateFields(["send_amount", "message"])
			.then(async (value) => {
				// Here make api call of something else
				console.log({ value });
				const amount = value.send_amount;
				const message = value.message;
				const email = donorInfo.email;
				const res = await getQRCodeImage(amount, message, email);
				console.log(res);
				setQRCodeImage(res.data.qrDataURL);
			})
			.catch((err) => console.log(err));
	};

	console.log({ donorInfo });

	const steps = [
		{
			title: "Bước 1",
			content: (
				<>
					<Form.Item
						label="Họ và tên"
						name="username"
						rules={[
							{
								required: true,
								message: "Hãy nhập tên của bạn!",
							},
						]}
						className="donate-form"
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
				</>
			),
		},
		{
			title: "Bước 2",
			content: (
				<>
                    <Form.Item
                        className="donate-form"
                        name="fundId"
                        label={<p>Quỹ</p>}
                        rules={[
							{
								required: true,
								message: "Hãy chọn quỹ bạn muốn quyên góp",
							},
						]}
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
                                options={fundsData.map((fund : FundObj) => ({
                                    ...fund,
                                    label : <p>{fund.name}</p>,
                                    value : fund.id
                                }))}
                            />
                            :
                            null
                        }
                    </Form.Item>
					<Form.Item
						className="donate-form"
						name="send_amount"
						label={<p>Số tiền từ thiện</p>}
						rules={[
							{
								validator: (_, value) => {
									if (/^[1-9][0-9]*$/.test(value)) {
										return Promise.resolve();
									} else {
										return Promise.reject(
											"Bạn chỉ có thể nhập số và không bắt đầu từ số 0"
										);
									}
								},
							},
							{
								required: true,
								message: "Hãy nhập số tiền bạn muốn từ thiện",
							},
						]}
					>
						<Input addonAfter="VND" />
					</Form.Item>
					<Form.Item
						label={<p>Lời nhắn</p>}
						name="message"
						// rules={[{ required: true, message: 'Hãy nhập số tài khoản ngân hàng!' }]}
						className="donate-form"
					>
						<Input.TextArea
							rows={6}
							placeholder="Ghi lại lời nhắn nếu có"
							maxLength={1000}
						/>
					</Form.Item>
					<Button
						type="primary"
						className="bg-mainPink hover:!bg-[#ffb09e]"
						onClick={handleRenderQRCode}
					>
						Tạo mã QR
					</Button>
					{QRCodeImage.length > 0 ? (
						<>
							<Divider></Divider>
							<Image
								src={QRCodeImage}
								width={300}
								height={300}
								alt="QR"
								className="m-auto"
							/>
							<div className="font-Montserrat">
								<p className="text-base">
									B1: Bạn hãy dùng điện thoại để quét mã QR
								</p>
								<i className="text-amber-500">
									Lưu ý: Nên chuyển khoản đúng với số tiền đã
									nhập <br /> để thuận lợi trong việc quản lý
								</i>
								<p className="mt-4 mb-4 text-base">
									B2: sau khi chuyển khoản chờ trong 5-10p{" "}
									<br /> và kiểm tra mail cũng như trên
									website để thấy thông tin xác nhận chuyển
									khoản
								</p>
								<p className="font-DancingScripts text-3xl">
									{" "}
									Chúng tôi xin chân thành cảm ơn tấm lòng của
									bạn, Chúc bạn một ngày tốt lành !{" "}
								</p>
							</div>
						</>
					) : null}
				</>
			),
		},
	];

	const items = steps.map((item) => ({ key: item.title, title: item.title }));

	const done = () => {
		form.validateFields(["send_amount", "message", "fundId"])
			.then(async (value) => {
				// Here make api call of something else
				console.log({ value });
				const transaction = {
					...donorInfo,
					...value,
				};
				const res = await sendDonateTransaction(transaction);
				toastSuccess(
					"Bạn đã từ thiện thành công, trân thành cảm ơn tấm lòng của bạn !"
				);
				console.log(res);
				setDonorInfo({
					...donorInfo,
					...value,
				});
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<div>
				<div className="text-center">
					<div className="uppercase text-3xl mb-4">
						Quỹ tiền cho sự kiện
					</div>
					<p className="w-[2px] h-10 bg-mainPink m-auto"></p>
					<div className="mt-4">
						<p className="text-lg font-medium">
							Đây là quỹ sẽ được dùng chung cho các sự kiện mà Happy Children tổ chức
						</p>
						<br />
						Chúng tôi sẽ dùng tiền và tổ chức hoặc hỗ trợ tổ chức
						<br />
						với mong muốn đa dạng các hoạt động và <br /> tạo môi trường để mọi người cùng nhau tham gia các hoạt động thiện nguyện
					</div>
				</div>
				<Steps current={current} items={items} />
				{/* <Steps current={current} >
            <Steps.Step key={0} title="First Step" />
            <Steps.Step key={1} title="Second Step" />
        </Steps> */}
				<div
					style={{
                        lineHeight: '260px',
                        textAlign: 'center',
                        color: token.colorTextTertiary,
                        backgroundColor: '#FEE8C2',
                        borderRadius: token.borderRadiusLG,
                        border: `1px dashed #F89A85`,
                        marginTop: 16,
					}}
				>
					{current === 0 && (
						<div className="text-xl uppercase my-10 tracking-wider font-medium text-red-400">
							Thông tin nhà hảo tâm
						</div>
					)}
					{current === 1 && (
						<div className="text-xl uppercase my-10 tracking-wider font-medium text-red-400">
							Thông tin chuyển khoản
						</div>
					)}
					<Form
						name="normal_donate"
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 14 }}
						style={{ maxWidth: 650 }}
						form={form}
						className="m-auto pt-10 pb-5 px-5 mb-8 rounded-xl bg-white shadow-md"
					>
						{steps[current].content}
					</Form>
				</div>
				<div
					style={{
						marginTop: 24,
					}}
				>
					{current < 1 && (
						<Button
							type="primary"
							className="bg-mainPink hover:!bg-[#ffb09e]"
							onClick={() => next()}
						>
							Tiếp
						</Button>
					)}
					{current === 1 && (
						<Button
							type="primary"
							className="bg-mainPink hover:!bg-[#ffb09e]"
							onClick={() => done()}
						>
							Hoàn Thành
						</Button>
					)}
					{current > 0 && (
						<Button
							style={{
								margin: "0 8px",
							}}
							onClick={() => prev()}
						>
							Trước
						</Button>
					)}
				</div>
				<div></div>
			</div>
		</div>
	);
};

export default FundDonate;
