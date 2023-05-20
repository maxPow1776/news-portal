import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/Drawer';

export interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo(
  ({ className, title, feedbackTitle, hasFeedback, onCancel, onAccept, rate = 0 }: RatingCardProps) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
          setIsModalOpen(true);
        } else {
          onAccept?.(selectedStarsCount);
        }
      },
      [hasFeedback, onAccept],
    );

    const acceptHandle = useCallback(() => {
      setIsModalOpen(false);
      onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandle = useCallback(() => {
      setIsModalOpen(false);
      onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          placeholder={t('yourFeedback')}
          value={feedback}
          onChange={setFeedback}
          data-testid="rating-card.input"
        />
      </>
    );

    return (
      <Card className={className} max data-testid="rating-card">
        <VStack align="center" gap="8">
          <Text title={starsCount ? t('thankYouForRating') : title} />
          <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack max gap="32">
              {modalContent}
              <HStack max gap="16" justify="end">
                <Button data-testid="rating-card.close" onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                  {t('close')}
                </Button>
                <Button data-testid="rating-card.send" onClick={acceptHandle}>
                  {t('send')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
            <VStack max gap="32">
              {modalContent}
              <Button onClick={acceptHandle} size={ButtonSize.L} fullWidth>
                {t('send')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </Card>
    );
  },
);
