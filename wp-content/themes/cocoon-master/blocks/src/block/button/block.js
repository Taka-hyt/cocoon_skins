/**
 * Cocoon Blocks
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */

import { THEME_NAME, BUTTON_BLOCK, fullFallbackStyles } from '../../helpers';
import { deprecated } from './deprecated';
import classnames from 'classnames';


const { __ } = wp.i18n;
const {
  registerBlockType,
} = wp.blocks;
const {
  InspectorControls,
  RichText,
  withColors,
  getColorClassName,
  PanelColorSettings,
  getFontSizeClass,
  withFontSizes,
  FontSizePicker,
  ContrastChecker,
} = wp.editor;
const {
  PanelBody,
  PanelColor,
  ColorPalette,
  SelectControl,
  TextControl,
  ToggleControl
} = wp.components;

const {
  Component,
  Fragment,
} = wp.element;

const {
  compose
} = wp.compose;


class CocoonButtonBlock extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes,
      setAttributes,
      mergeBlocks,
      onReplace,
      className,
      backgroundColor,
      setBackgroundColor,
      textColor,
      setTextColor,
      borderColor,
      setBorderColor,
      fallbackBackgroundColor,
      fallbackTextColor,
      fallbackBorderColor,
      fallbackFontSize,
      fontSize,
      setFontSize,
    } = this.props;

    const {
      content,
      size,
      url,
      target,
      isCircle,
      isShine,
    } = attributes;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __( 'ボタン設定', THEME_NAME ) }>

            <TextControl
              label={ __( 'URL', THEME_NAME ) }
              value={ url }
              onChange={ ( value ) => setAttributes( { url: value } ) }
            />

            <SelectControl
              label={ __( 'リンクの開き方', THEME_NAME ) }
              value={ target }
              onChange={ ( value ) => setAttributes( { target: value } ) }
              options={ [
                {
                  value: '_self',
                  label: __( '現在のタブで開く', THEME_NAME ),
                },
                {
                  value: '_blank',
                  label: __( '新しいタブで開く', THEME_NAME ),
                },
              ] }
            />

            <SelectControl
              label={ __( 'サイズ', THEME_NAME ) }
              value={ size }
              onChange={ ( value ) => setAttributes( { size: value } ) }
              options={ [
                {
                  value: 'btn-s',
                  label: __( '小', THEME_NAME ),
                },
                {
                  value: 'btn-m',
                  label: __( '中', THEME_NAME ),
                },
                {
                  value: 'btn-l',
                  label: __( '大', THEME_NAME ),
                },
              ] }
            />

            <ToggleControl
              label={ __( '円形にする', THEME_NAME ) }
              checked={ isCircle }
              onChange={ ( value ) => setAttributes( { isCircle: value } ) }
            />

            <ToggleControl
              label={ __( '光らせる', THEME_NAME ) }
              checked={ isShine }
              onChange={ ( value ) => setAttributes( { isShine: value } ) }
            />

          </PanelBody>

          <PanelBody title={ __( '文字サイズ', THEME_NAME ) } className="blocks-font-size">
            <FontSizePicker
              fallbackFontSize={ fallbackFontSize }
              value={ fontSize.size }
              onChange={ setFontSize }
            />
          </PanelBody>

          <PanelColorSettings
            title={ __( '色設定', THEME_NAME ) }
            colorSettings={[
              {
                label: __( '背景色', THEME_NAME ),
                onChange: setBackgroundColor,
                value: backgroundColor.color,
              },
              {
                label: __( '文字色', THEME_NAME ),
                onChange: setTextColor,
                value: textColor.color,
              },
              {
                label: __( 'ボーダー色', THEME_NAME ),
                onChange: setBorderColor,
                value: borderColor.color,
              },
            ]}
          />
        </InspectorControls>

        <div className={BUTTON_BLOCK}>
          <span
            className={classnames(className, {
              'btn': true,
              [ size ]: size,
              [ 'btn-circle' ]: !! isCircle,
              [ 'btn-shine' ]: !! isShine,
              'has-text-color': textColor.color,
              'has-background': backgroundColor.color,
              'has-border-color': borderColor.color,
              [backgroundColor.class]: backgroundColor.class,
              [textColor.class]: textColor.class,
              [borderColor.class]: borderColor.class,
              [fontSize.class]: fontSize.class,
            })}
            href={ url }
            target={ target }
          >
            <RichText
              value={ content }
              onChange={ ( value ) => setAttributes( { content: value } ) }
            />
          </span>
        </div>

      </Fragment>
    );
  }
}

registerBlockType( 'cocoon-blocks/button-1', {

  title: __( 'ボタン', THEME_NAME ),
  icon: 'embed-generic',
  category: THEME_NAME + '-block',
  description: __( '一般的なリンクボタンを作成します。', THEME_NAME ),
  keywords: [ 'button', 'btn' ],

  attributes: {
    content: {
      type: 'string',
      default: __( 'ボタン', THEME_NAME ),
    },
    url: {
      type: 'string',
      default: '',
    },
    target: {
      type: 'string',
      default: '_self',
    },
    size: {
      type: 'string',
      default: '',
    },
    isCircle: {
      type: 'boolean',
      default: false,
    },
    isShine: {
      type: 'boolean',
      default: false,
    },
    align: {
      type: 'string',
    },
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    textColor: {
      type: 'string',
    },
    customTextColor: {
      type: 'string',
    },
    borderColor: {
      type: 'string',
    },
    customBorderColor: {
      type: 'string',
    },
    fontSize: {
      type: 'string',
    },
    customFontSize: {
      type: 'string',
    },
  },
  supports: {
    align: [ 'left', 'center', 'right' ],
    customClassName: true,
  },

  edit: compose([
    withColors('backgroundColor', {textColor: 'color', borderColor: 'border-color'}),
    withFontSizes('fontSize'),
    fullFallbackStyles,
  ])(CocoonButtonBlock),
  save: props => {
    const {
      content,
      size,
      url,
      target,
      isCircle,
      isShine,
      backgroundColor,
      customBackgroundColor,
      textColor,
      customTextColor,
      borderColor,
      customBorderColor,
      fontSize,
      customFontSize,
    } = props.attributes;

    const backgroundClass = getColorClassName( 'background-color', backgroundColor );
    const textClass = getColorClassName( 'color', textColor );
    const borderClass = getColorClassName( 'border-color', borderColor );
    const fontSizeClass = getFontSizeClass( fontSize );


    const className = classnames( {
      'btn': true,
      [ size ]: size,
      [ 'btn-circle' ]: !! isCircle,
      [ 'btn-shine' ]: !! isShine,
      'has-text-color': textColor || customTextColor,
      'has-background': backgroundColor || customBackgroundColor,
      'has-border-color': borderColor || customBorderColor,
      [ textClass ]: textClass,
      [ backgroundClass ]: backgroundClass,
      [ borderClass ]: borderClass,
      [ fontSizeClass ]: fontSizeClass,
    } );

    return (
      <div className={BUTTON_BLOCK}>
        <a
          href={ url }
          className={ className }
          target={ target }
          rel="noopener"
        >
          <RichText.Content
            value={ content }
          />
        </a>
      </div>
    );
  },

  deprecated: deprecated,
});
