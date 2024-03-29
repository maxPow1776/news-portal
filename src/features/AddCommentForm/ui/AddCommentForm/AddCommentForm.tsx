import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import classes from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        off={
          <HStack
            data-testid="add-comment-form"
            justify="between"
            max
            className={classNames(classes.addCommentForm, {}, [className])}>
            <InputDeprecated
              data-testid="add-comment-form.input"
              className={classes.input}
              placeholder={t('enterTextComment')}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated data-testid="add-comment-form.button" onClick={onSendHandler}>
              {t('send')}
            </ButtonDeprecated>
          </HStack>
        }
        on={
          <Card max padding="24" border="partial">
            <HStack
              data-testid="add-comment-form"
              justify="between"
              max
              gap="16"
              className={classNames('', {}, [className])}>
              <Input
                data-testid="add-comment-form.input"
                className={classes.input}
                placeholder={t('enterTextComment')}
                value={text}
                onChange={onCommentTextChange}
              />
              <Button data-testid="add-comment-form.button" onClick={onSendHandler}>
                {t('send')}
              </Button>
            </HStack>
          </Card>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
