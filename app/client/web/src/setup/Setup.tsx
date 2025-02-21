import classes from './Setup.module.css'
import { useSetup } from './useSetup.hook'
import { Radio, Group, Loader, Modal, Divider, Text, TextInput, Switch, ActionIcon } from '@mantine/core'

export function Setup() {
  const { state, actions } = useSetup();

  return (
    <div className={classes.setup}>
      <div className={classes.header}>
        <div className={classes.loader}>
          { state.loading && (
            <Loader size={18} />
          )}
        </div>
        <div className={classes.centerTitle}>
          <Text className={classes.title}>{ state.strings.setup }</Text>
        </div>
        <div className={classes.loader}>
          { state.updating && (
            <Loader size={18} />
          )}
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.keyType}:</Text>
          <Radio.Group name="keyType" className={classes.radio} disabled={state.loading} value={state.setup?.keyType} onChange={actions.setKeyType}>
            <Group mt="xs">
              <Radio value="RSA_2048" label="RSA2048" />
              <Radio value="RSA_4096" label="RSA4096" />
            </Group>
          </Radio.Group>
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.federatedHost}:</Text>
          <TextInput
            className={classes.value}
            size="sm"
            disabled={state.loading}
            value={state.setup?.domain || ''}
            placeholder={state.strings.urlHint}
            onChange={(event) => actions.setDomain(event.currentTarget.value)}
          />  
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.storageLimit}:</Text>
          <TextInput
            className={classes.value}
            size="sm"
            disabled={state.loading}
            value={state.accountStorage}
            placeholder={state.strings.storageHint}
            onChange={(event) => actions.setAccountStorage(event.currentTarget.value)}
          />  
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.accountCreation}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableOpenAccess} onChange={(ev) => actions.setEnableOpenAccess(ev.currentTarget.checked)} />
          { state.setup?.enableOpenAccess && (
            <TextInput
              className={classes.value}
              size="sm"
              disabled={state.loading}
              value={state.setup?.openAccessLimit || ''}
              placeholder={state.strings.storageHint}
              onChange={(event) => actions.setOpenAccessLimit(event.currentTarget.value)}
            />
          )}
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.enablePush}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.pushSupported} onChange={(ev) => actions.setPushSupported(ev.currentTarget.checked)} />
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.allowUnsealed}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.allowUnsealed} onChange={(ev) => actions.setAllowUnsealed(ev.currentTarget.checked)} />
        </div>
        <Divider />
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.enableImage}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableImage} onChange={(ev) => actions.setEnableImage(ev.currentTarget.checked)} />
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.enableAudio}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableAudio} onChange={(ev) => actions.setEnableAudio(ev.currentTarget.checked)} />
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.enableVideo}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableVideo} onChange={(ev) => actions.setEnableVideo(ev.currentTarget.checked)} />
        </div>
        <div className={classes.option}>
          <Text className={classes.label}>{state.strings.enableBinary}:</Text>
          <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableBinary} onChange={(ev) => actions.setEnableBinary(ev.currentTarget.checked)} />
        </div>
        <Divider />
        <div className={classes.webrtc}>
          <div className={classes.option}>
            <Text className={classes.label}>{state.strings.enableWeb}:</Text>
            <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableIce} onChange={(ev) => actions.setEnableIce(ev.currentTarget.checked)} />
          </div>
          { state.setup?.enableIce && (
            <div className={classes.option}>
              <Text className={classes.label}>{state.strings.enableService}:</Text>
              <Switch className={classes.switch} disabled={state.loading} checked={state.setup?.enableService} onChange={(ev) => actions.setEnableService(ev.currentTarget.checked)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

