import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableListItem, Icon } from '@ohif/ui';
import ReactTooltip from 'react-tooltip';
import LabellingFlow from '../../../../../platform/viewer/src/components/Labelling/LabellingFlow';

import './SegmentItem.css';

const ColoredCircle = ({ color }) => {
  return (
    <div
      className="segment-color"
      style={{ backgroundColor: `rgba(${color.join(',')})` }}
    ></div>
  );
};

ColoredCircle.propTypes = {
  color: PropTypes.array.isRequired,
};

const SegmentItem = ({
  index,
  label,
  onClick,
  itemClass,
  color,
  labelmap3D,
  labels,
  visible,
  onVisibilityChange,
  servicesManager,
  onLabelChange,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const { UINotificationService, UIDialogService } = servicesManager.services;

  const [labelText, setLabelText] = useState(label);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (labelText != label) {
      onLabelChange(labelText, index, labels);
    }
  }, [labelText]);

  const onClickHandler = () => onClick(index);

  const onVisibilityChangeHandler = event => {
    event.stopPropagation();
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onVisibilityChange(newVisibility, index, labelmap3D);
  };

  const showLabellingDialog = (props, measurementData) => {
    if (!UIDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }

    UIDialogService.dismiss({ id: 'labelling' });
    UIDialogService.create({
      id: 'labelling',
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: LabellingFlow,
      contentProps: {
        measurementData,
        labellingDoneCallback: () =>
          UIDialogService.dismiss({ id: 'labelling' }),
        updateLabelling: ({ location, description }) => {
          measurementData.location = location || measurementData.location;
          measurementData.description = description || '';
          setLabelText(
            measurementData.location + ' ' + measurementData.description
          );
        },
        ...props,
      },
    });
  };

  const deleteSegmentationLabel = () =>
  {
 
    
    // const labelmap3Did = labelmap3D.colorLUTIndex-1;
    console.log(labelmap3D);
    for(let i=0;i<labelmap3D.labelmaps2D.length;i++){
      if(!labelmap3D.labelmaps2D[i]){
        continue;
      }else{
        for(let j=0;j<labelmap3D.labelmaps2D[i].pixelData.length;j++){
          if(labelmap3D.labelmaps2D[i].pixelData[j] === index){
            labelmap3D.labelmaps2D[i].pixelData[j] = 0;
          }
        }
        for(let j=0; j<labelmap3D.labelmaps2D[i].segmentsOnLabelmap.length;j++){
          if(labelmap3D.labelmaps2D[i].segmentsOnLabelmap[j] === index){
            //labelmap3D.labelmaps2D[i].segmentsOnLabelmap.splice(j, 1);
            labelmap3D.labelmaps2D[i].segmentsOnLabelmap[j] = 0;
            break;
          }
        }
      } 
    }
  };

  return (
    <div className="dcmseg-segment-item">
      <TableListItem
        key={index}
        itemKey={index}
        itemIndex={index}
        itemClass={itemClass}
        itemMeta={<ColoredCircle color={color} />}
        itemMetaClass="segment-color-section"
        onItemClick={onClickHandler}
      >
        <div>
          <div className="segment-label" style={{ marginBottom: 4 }}>
            <a data-tip data-for={`SegmentHover${index}`}>
              <span>{labelText}</span>
            </a>
            <ReactTooltip
              id={`SegmentHover${index}`}
              delayShow={250}
              place="right"
              border={true}
              type="light"
            >
              <span>{labelText}</span>
            </ReactTooltip>
            <Icon
              className={`eye-icon ${isVisible && '--visible'}`}
              name={isVisible ? 'eye' : 'eye-closed'}
              width="20px"
              height="20px"
              onClick={onVisibilityChangeHandler}
            />
          </div>
          {false && <div className="segment-info">{'...'}</div>}
          {true && (
            <div className="segment-actions">
              <button    //segmentatnion 라벨 수정
                className="btnAction"
                onClick={() =>
                  showLabellingDialog(
                    { editLocation: true, skipAddLabelButton: true },
                    { location: '', description: '' }
                  )}
              >
                <span style={{ marginRight: '4px' }}>
                  <Icon name="edit" width="14px" height="14px" />
                </span>
                Relabel
              </button>
              <button   //segmentaion 그림 삭제
                className="btnAction"
                onClick={() =>
                  deleteSegmentationLabel(
                    
                  )
                }
              >
                <span style={{ marginRight: '4px' }}>
                  <Icon name="edit" width="14px" height="14px" />
                </span>
                Delete
              </button>
              {/* <button
                className="btnAction"
                onClick={tool =>
                  showLabellingDialog({ editDescriptionOnDialog: true }, tool)
                }
              >
                <span style={{ marginRight: '4px' }}>
                  <Icon name="edit" width="14px" height="14px" />
                </span>
                Description
              </button> */}
            </div>
          )}
        </div>
      </TableListItem>
    </div>
  );
};

SegmentItem.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  itemClass: PropTypes.string,
  color: PropTypes.array.isRequired,
};

SegmentItem.defaultProps = {
  itemClass: '',
  onClick: () => {},
};

export default SegmentItem;
