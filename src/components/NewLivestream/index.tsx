import React from 'react';
import { observer } from 'mobx-react-lite';
import { Option, Typography } from 'ui-kit';
import { Form, Field, FormikProps, FieldProps } from 'formik';
import RadioGroup from 'components/RadioGroup';
import Input from 'components/Input';
import Select from 'components/Select';
import StreamsStore from 'stores/streams';
import css from './index.module.scss';

const { RadioBtn } = RadioGroup;

interface Props {
  profile: Option;
  outputType: string;
  inputType: string;
}

const NewLivestream = (props: FormikProps<Props>) => {
  const { profilesSelect } = StreamsStore;
  const { setFieldValue, setFieldTouched, values, handleChange } = props;
  const { profile, outputType } = values;

  return (
    <Form className={css.form} id="streamForm">
      <div className={css.row}>
        <Typography type="subtitle">General details</Typography>
        <div className={css.name}>
          <Field component={Input} label="Stream Name" name="name" />
        </div>
      </div>
      <div className={css.row}>
        <Typography type="subtitle">Select Input</Typography>
        <Field name="inputType" component={RadioGroup} onChange={handleChange}>
          <RadioBtn value="INPUT_TYPE_RTMP" activeClassname={css.activeRadio}>
            <Typography type="body">RTMP</Typography>
          </RadioBtn>
          <RadioBtn value="INPUT_TYPE_WEBRTC" activeClassname={css.activeRadio}>
            <Typography type="body">WebRTC</Typography>
          </RadioBtn>
          <RadioBtn value="rtsp" disabled>
            <div className={css.radioLabel}>
              <Typography type="body">RTSP</Typography>
              <Typography type="caption" theme="sunkissed">
                Coming Soon
              </Typography>
            </div>
          </RadioBtn>
          <RadioBtn value="hls" disabled>
            <div className={css.radioLabel}>
              <Typography type="body">HLS</Typography>
              <Typography type="caption" theme="sunkissed">
                Coming Soon
              </Typography>
            </div>
          </RadioBtn>
        </Field>
      </div>
      <div className={css.row}>
        <Typography type="subtitle">Select Output</Typography>
        <Field
          name="outputType"
          render={({ field, form }: FieldProps) => (
            <RadioGroup field={field} form={form}>
              <RadioBtn
                value="OUTPUT_TYPE_HLS"
                activeClassname={css.activeRadio}
              >
                <Typography type="body">HLS</Typography>
              </RadioBtn>
              {outputType === 'OUTPUT_TYPE_HLS' && (
                <div className={css.innerField}>
                  <Select
                    isSearchable={false}
                    placeholder="Select Profile"
                    name="profile"
                    value={profile}
                    options={profilesSelect}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </div>
              )}
              <RadioBtn value="rtmp" disabled>
                <div className={css.radioLabel}>
                  <Typography type="body">RTMP</Typography>
                  <Typography type="caption" theme="sunkissed">
                    Coming Soon
                  </Typography>
                </div>
              </RadioBtn>
              <RadioBtn value="rtsp" disabled>
                <div className={css.radioLabel}>
                  <Typography type="body">RTSP</Typography>
                  <Typography type="caption" theme="sunkissed">
                    Coming Soon
                  </Typography>
                </div>
              </RadioBtn>
            </RadioGroup>
          )}
        />
      </div>
    </Form>
  );
};

export default observer(NewLivestream);
