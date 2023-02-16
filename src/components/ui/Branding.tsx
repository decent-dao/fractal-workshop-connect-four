import { Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { FractalBrand } from '@decent-org/fractal-ui'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { FractalLogo } from '../icons/FractalLogo'

export function Branding() {
  const navigate = useNavigate()
  return (
    <Flex
      alignItems={{ min0: 'center', min1920: 'flex-start' }}
      flexDirection={{ min0: 'row', min1920: 'column' }}
      h='full'
      justifyContent='space-between'
      px={{ min0: 0, min600: 0, min1920: 12 }}
      pt={{ min0: 4, min600: 2, min1920: 28 }}
      pb={{ min0: 4, min600: 2, min1920: 12 }}
    >
      <Flex
        alignItems={{ min0: 'flex-start', min400: 'center', min1920: 'flex-start' }}
        justifyContent={{ min0: 'flex-start', min400: 'center', min1920: 'flex-start' }}
        flexDirection={{ min0: 'row', min1920: 'column' }}
        gap={{ min0: 0, min1920: '12' }}
        w='full'
        ml={{ min0: 2, min400: 8, min1920: 0 }}
      >
        <IconButton
          aria-label='home'
          icon={
            <FractalLogo
              width={{ min0: '4rem', min400: '8rem', min1000: '12rem', min1920: '12rem' }}
              height='auto'
            />
          }
          onClick={() => navigate(ROUTES.base.relative())}
          variant='unstyled'
        />
        <Flex
          alignItems={{ min0: 'center', min1920: 'flex-start' }}
          flexDirection='column'
          gap={{ min0: 0, min1920: '4' }}
          justifyContent={{ min0: 'center', min1920: 'flex-start' }}
          w='full'
        >
          <Text
            color='gold.500'
            textStyle={{
              min0: 'text-xs-mono-semibold',
              min400: 'text-2xl-mono-semibold',
              min1920: 'text-6xl-mono-semibold',
            }}
          >
            On-chain Connect 4
          </Text>
          <Text
            textStyle={{
              min0: 'text-xs-mono-semibold',
              min400: 'text-base-mono-semibold',
              min1920: 'text-2xl-mono-semibold',
            }}
          >
            POWERED BY{' '}
            <Link
              href='https://www.decent-dao.org/'
              rel='noopener noreferrer'
              target='_blank'
              textDecoration='underline'
            >
              DECENT
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={{ min0: 'flex-end', min1920: 'flex-start' }}
        width={{ min0: 'auto', min1000: '12rem', min1920: 'auto' }}
      >
        <Link href='https://www.fractalframework.xyz/' target='_blank' rel='noopener noreferer'>
          <IconButton
            aria-label='home'
            ml={{ min0: 0, min600: 0, min1000: 0, min1920: -8 }}
            icon={<FractalBrand boxSize={{ min0: 16, min600: 20, min1000: 24, min1920: 32 }} />}
            variant='unstyled'
          />
        </Link>
      </Flex>
    </Flex>
  )
}
