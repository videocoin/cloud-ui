import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from 'ui-kit';
import { Field, FieldProps, Form, useFormikContext } from 'formik';
import RadioGroup from 'components/RadioGroup';
import Input from 'components/Input';
import Select from 'components/Select';
import StreamsStore from 'stores/streams';
import { map } from 'lodash/fp';
import { STREAM_INPUT_TYPE, STREAM_OUTPUT_TYPE } from 'const';
import { SelectOption } from '@types';
import css from './index.module.scss';

const { RadioBtn } = RadioGroup;

interface FormValues {
  name: string;
  inputType: STREAM_INPUT_TYPE;
  outputType: STREAM_OUTPUT_TYPE;
  profile: SelectOption | null;
}
interface RadioInputType {
  label: string;
  value: STREAM_INPUT_TYPE;
  active: boolean;
}
const inputs: RadioInputType[] = [
  {
    label: 'RTMP',
    value: STREAM_INPUT_TYPE.RTMP,
    active: true,
  },
  {
    label: 'WebRTC',
    value: STREAM_INPUT_TYPE.WEBRTC,
    active: true,
  },
  {
    label: 'File Upload',
    value: STREAM_INPUT_TYPE.FILE,
    active: true,
  },
  // {
  //   label: 'RTSP',
  //   value: STREAM_INPUT_TYPE.RTSP,
  //   active: false,
  // },
  // {
  //   label: 'HLS',
  //   value: STREAM_INPUT_TYPE.HLS,
  //   active: false,
  // },
];
const NewStream = () => {
  const { profilesSelect } = StreamsStore;
  const { setFieldValue, setFieldTouched, values } = useFormikContext<
    FormValues
  >();
  const { profile, outputType, inputType } = values;
  useEffect(() => {
    if (
      outputType === STREAM_OUTPUT_TYPE.FILE &&
      inputType !== STREAM_INPUT_TYPE.FILE
    ) {
      setFieldValue('outputType', STREAM_OUTPUT_TYPE.HLS);
    }
  }, [inputType, outputType, setFieldValue]);
  const renderRadioInputType = ({ label, value, active }: RadioInputType) => (
    <RadioBtn
      key={value}
      value={value}
      activeClassname={css.activeRadio}
      disabled={!active}
    >
      <Typography type="body">{label}</Typography>
      {!active && (
        <Typography type="caption" theme="sunkissed">
          Coming Soon
        </Typography>
      )}
    </RadioBtn>
  );

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
        <Field name="inputType" component={RadioGroup}>
          {map(renderRadioInputType)(inputs)}
        </Field>
      </div>
      <div className={css.row}>
        <Typography type="subtitle">Select Output</Typography>
        <Field
          name="outputType"
          render={(props: FieldProps) => (
            <RadioGroup {...props}>
              <RadioBtn
                value={STREAM_OUTPUT_TYPE.HLS}
                activeClassname={css.activeRadio}
              >
                <Typography type="body">HLS</Typography>
              </RadioBtn>
              {outputType === STREAM_OUTPUT_TYPE.HLS && (
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
              {/* <RadioBtn
                value={STREAM_OUTPUT_TYPE.FILE}
                activeClassname={css.activeRadio}
                disabled={inputType !== STREAM_INPUT_TYPE.FILE}
              >
                <Typography type="body">File</Typography>
              </RadioBtn> */}
              {outputType === STREAM_OUTPUT_TYPE.FILE && (
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
              {/*<RadioBtn value="rtmp" disabled>*/}
              {/*  <div className={css.radioLabel}>*/}
              {/*    <Typography type="body">RTMP</Typography>*/}
              {/*    <Typography type="caption" theme="sunkissed">*/}
              {/*      Coming Soon*/}
              {/*    </Typography>*/}
              {/*  </div>*/}
              {/*</RadioBtn>*/}
              {/*<RadioBtn value="rtsp" disabled>*/}
              {/*  <div className={css.radioLabel}>*/}
              {/*    <Typography type="body">RTSP</Typography>*/}
              {/*    <Typography type="caption" theme="sunkissed">*/}
              {/*      Coming Soon*/}
              {/*    </Typography>*/}
              {/*  </div>*/}
              {/*</RadioBtn>*/}
            </RadioGroup>
          )}
        />
      </div>
    </Form>
  );
};

export default observer(NewStream);
