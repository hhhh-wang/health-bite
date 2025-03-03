<template>
    <view class="wrap">
        <view class="header">
            <u-icon name="arrow-left" size="44" @click="cancel"></u-icon>
            <text class="header-title">修改手机号</text>
        </view>
        
        <u-form class="form" :model="model" :rules="rules" ref="uForm">
            <u-form-item label="当前手机号" prop="oldPhone" label-width="180">
                <text class="current-phone">{{currentPhone}}</text>
            </u-form-item>
            <u-form-item label="新手机号" prop="newPhone" label-width="180">
                <u-input 
                    v-model="model.newPhone" 
                    type="number" 
                    maxlength="11"
                    placeholder="请输入新手机号">
                </u-input>
            </u-form-item>
            <u-form-item label="验证码" prop="code" label-width="180">
                <view class="code-input-box">
                    <u-input 
                        v-model="model.code"
                        type="number"
                        maxlength="6"
                        placeholder="请输入验证码">
                    </u-input>
                    <u-button 
                        :disabled="counting"
                        size="mini" 
                        type="primary" 
                        @click="getCode">
                        {{counting ? `${counter}s后重新获取` : '获取验证码'}}
                    </u-button>
                </view>
            </u-form-item>
        </u-form>
        
        <view class="form-footer">
            <u-button class="btn" type="primary" @click="submit">确认修改</u-button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentPhone: '138****8888', // 当前手机号
            model: {
                newPhone: '',
                code: ''
            },
            rules: {
                newPhone: [{
                    required: true,
                    message: '请输入新手机号',
                    trigger: ['change', 'blur']
                }, {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '请输入正确的手机号',
                    trigger: ['change', 'blur']
                }],
                code: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: ['change', 'blur']
                }, {
                    len: 6,
                    message: '请输入6位验证码',
                    trigger: ['change', 'blur']
                }]
            },
            counting: false,
            counter: 60
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        // 获取验证码
        getCode() {
            if (!this.model.newPhone) {
                this.$u.toast('请先输入新手机号');
                return;
            }
            if (!/^1[3456789]\d{9}$/.test(this.model.newPhone)) {
                this.$u.toast('请输入正确的手机号');
                return;
            }
            
            // 开始倒计时
            this.counting = true;
            this.counter = 60;
            const timer = setInterval(() => {
                if (this.counter > 0) {
                    this.counter--;
                } else {
                    this.counting = false;
                    clearInterval(timer);
                }
            }, 1000);
            
            // TODO: 调用发送验证码接口
            this.$u.toast('验证码已发送');
        },
        
        // 提交表单
        submit() {
            this.$refs.uForm.validate(valid => {
                if (valid) {
                    // TODO: 调用修改手机号接口
                    uni.showModal({
                        title: '提示',
                        content: '手机号修改成功',
                        showCancel: false,
                        success: () => {
                            uni.navigateBack();
                        }
                    });
                }
            });
        },
        
        // 返回上一页
        cancel() {
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss">
.wrap {
    min-height: 100vh;
    background-color: #f8f8f8;
    
    .header {
        display: flex;
        align-items: center;
        padding: 20rpx 30rpx;
        background-color: #ffffff;
        
        .header-title {
            flex: 1;
            text-align: center;
            font-size: 32rpx;
            font-weight: 500;
            margin-right: 44rpx;
        }
    }
    
    .form {
        margin-top: 20rpx;
        padding: 20rpx;
        background-color: #ffffff;
        
        .current-phone {
            font-size: 28rpx;
            color: #666;
        }
        
        .code-input-box {
            display: flex;
            align-items: center;
            
            .u-input {
                flex: 1;
                margin-right: 20rpx;
            }
        }
    }
    
    .form-footer {
        margin: 40rpx 20rpx;
        
        .btn {
            margin-bottom: 20rpx;
        }
    }
}
</style> 