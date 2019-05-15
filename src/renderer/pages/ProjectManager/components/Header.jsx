import React from "react";
import { PageHeader, Button, Tooltip } from "antd";
import { connect } from "react-redux";
import { openFileFolder, runExec, openTerminal } from "../../../shell";

class Header extends React.Component {
  render() {
    const { name, path, currentEditor, currentTerminal, onBack } = this.props;

    console.log(this.props);

    return (
      <PageHeader onBack={onBack} title={name} subTitle={path}>
        <Tooltip title="在编辑器中打开">
          <Button
            icon="edit"
            type="link"
            onClick={() =>
              runExec({
                command: `code ${path}`,
                onData: d => console.log(d),
                onError: d => console.error(d),
                onClose: d => d
              })
            }
          >
            编辑器
          </Button>
        </Tooltip>
        <Tooltip title="在命令行中打开">
          <Button
            icon="code"
            type="link"
            onClick={() => openTerminal(currentTerminal, `cd ${path}`)}
          >
            命令行
          </Button>
        </Tooltip>
        <Tooltip title="打开文件夹">
          <Button
            icon="folder-open"
            type="link"
            onClick={() => openFileFolder(path)}
          >
            文件夹
          </Button>
        </Tooltip>
      </PageHeader>
    );
  }
}

const mapStateToProps = state => ({
  ...state.setting
});

export default connect(
  mapStateToProps,
  null
)(Header);
