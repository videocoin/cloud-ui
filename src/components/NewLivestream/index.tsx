import React from 'react';
import { Option, Typography } from 'ui-kit';
import { Form, Field, FormikProps, FieldProps } from 'formik';
import RadioGroup from 'components/RadioGroup';
import Input from 'components/Input';
import Select from 'components/Select';
import { LiveStreamProfiles } from 'const';
import css from './index.module.scss';

const { RadioBtn } = RadioGroup;

interface Props {
  profile: Option;
  output: string;
}

const NewLivestream = (props: FormikProps<Props>) => {
  const { setFieldValue, setFieldTouched, values } = props;
  const { profile, output } = values;

  return (
    <Form className={css.form} id="pipelineForm">
      <div className={css.row}>
        <Typography type="subtitle">General details</Typography>
        <div className={css.name}>
          <Field
            component={Input}
            label="Livestream Pipeline Name"
            name="name"
          />
        </div>
      </div>
      <div className={css.row}>
        <Typography type="subtitle">Select Input</Typography>
        <Field name="input" component={RadioGroup}>
          <RadioBtn value="rtmp" activeClassname={css.activeRadio}>
            <Typography type="bodyAlt">RTMP</Typography>
          </RadioBtn>
          <RadioBtn value="rtsp" disabled>
            <div className={css.radioLabel}>
              <Typography type="bodyAlt">RTSP</Typography>
              <Typography type="caption" theme="primary">
                Coming Soon
              </Typography>
            </div>
          </RadioBtn>
          <RadioBtn value="hls" disabled>
            <div className={css.radioLabel}>
              <Typography type="bodyAlt">HLS</Typography>
              <Typography type="caption" theme="primary">
                Coming Soon
              </Typography>
            </div>
          </RadioBtn>
        </Field>
      </div>
      <div className={css.row}>
        <Typography type="subtitle">Select Output</Typography>
        <Field
          name="output"
          render={({ field, form }: FieldProps) => (
            <RadioGroup field={field} form={form}>
              <RadioBtn value="hls" activeClassname={css.activeRadio}>
                <Typography type="bodyAlt">HLS</Typography>
              </RadioBtn>
              {output === 'hls' && (
                <div className={css.innerField}>
                  <Select
                    isSearchable={false}
                    placeholder="Select Profile"
                    name="profile"
                    value={profile}
                    options={LiveStreamProfiles}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </div>
              )}
              <RadioBtn value="rtmp" disabled>
                <div className={css.radioLabel}>
                  <Typography type="bodyAlt">RTMP</Typography>
                  <Typography type="caption" theme="primary">
                    Coming Soon
                  </Typography>
                </div>
              </RadioBtn>
              <RadioBtn value="rtsp" disabled>
                <div className={css.radioLabel}>
                  <Typography type="bodyAlt">RTSP</Typography>
                  <Typography type="caption" theme="primary">
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

export default NewLivestream;
